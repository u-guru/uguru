<script>
var all_universities;

var matcher;

$(document).ready(function() {
    universities_arr = readAndParseJSON('/static/data/fa15_targetted.json');
    matcher = initMatcher(universities_arr);
    initTypeahead(matcher, universities_arr);
});

function readAndParseJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200)
        universities_arr = JSON.parse(request.responseText);
    return universities_arr;
}

var initMatcher = function(arr) {
    var matcher = new FastMatcher(arr, {
        // the property, or array of properties, to base matches on
        selector: ['name', 'city', 'state'],

        // duh, what do you think this does?
        caseInsensitive: true,

        // return matches in their original order
        preserveOrder: false,

        // whether to match against any word (not just first) for each string
        anyWord: true,

        // how many matches to find at a time
        limit: 3
    });
    return matcher;
}

{% raw %}
var initTypeahead = function(matcher, source) {

    $('.typeahead').typeahead({
        minLength: 1,
        highlight: true,
        hint: true
    }, {
        displayKey: 'title',
        source: function(q, cb) {
            cb(matcher.getMatches(q))
        },
        templates: {
            //if no results show
            empty: [
                '<div class="tt-suggestion">',
                '<a href="http://goo.gl/forms/UQ7WcYl3sb" class="university-link" target="_blank"><div><img src="/static/web/svg/logo-shamrock.svg"/></div><div><h2><span class="title">No results found (yet!)</span> Click to Bring Uguru to Your University / School</h2></div></a>',
                '</div>'
            ].join('\n'),
            suggestion: Handlebars.compile("<div><img src='{{logo_url}}' alt=''/></div><div><h2>{{name}}</h2><p>{{city}}, {{state}}, USA</p></div>")
        }
    }).on('typeahead:selected', function(event, suggested, dataset_name) {
        // $("#search-box").slideUp();
        // $("#border-outer").css("fill", "white");
        $("#top-school-banner").css("width", "20%");
        $('#top-school-logo').css("width","auto");
        var successCallback = function() {
            itemSelectedGlobal = true;
            showSearchResultsCallback(suggested);
        }
        customizeSearchResults(suggested, successCallback);
            //make it wobble
    }).on('typeahead:cursorchanged', function(event, suggested, dataset_name) {
        $('.tt-suggestion').css('background-color', 'white');
        var suggestedTypeaheadListItem = document.querySelectorAll('.tt-suggestion.tt-cursor')[dataset_name];
        suggestedTypeaheadListItem.style.backgroundColor = 'rgba(0,0,0,0.1)';
        // event.target.style.backgroundColor = 'rgba(0,0,0,0.1)';
    });
};

{% endraw %}
var showSearchResultsCallback = function(uni_data) {
    var successCallback = function() {
        setTimeout(function() {
            searchResultsBackgroundMap.style.backgroundImage = constructStaticGMapBackground(uni_data.latitude,uni_data.longitude);
        }, 200)
    }

    animateSearchBoxResults(uni_data.school_color_one, successCallback);
}
var isColorDark = function(c) {
    var c = c.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return (luma < 40);
}

var constructStaticGMapBackground = function(lat, _long) {
    default_zoom = 16;
    height = document.querySelector('.search-results-map').offsetHeight;
    width = document.querySelector('.search-results-map').offsetWidth;
    size = width * 2 + 'x'  + height * 2;
    return 'url(' +  'https://maps.googleapis.com/maps/api/staticmap?center='+ lat + ',' + _long + '&size=' + size +'&zoom=' + default_zoom + '&maptype=roadmap)';

}

var customizeSearchResults = function(uni_data, postSearchCallback) {
    schoolNameElement = document.getElementById('search-school-name');
    schoolLogoElement = document.getElementById('top-school-logo');
    schoolBannerOuterBorder = document.getElementById('border-outer');
    schoolBannerInnerBorder = document.getElementById('border-inner');
    searchResultsBgBannerElement = document.querySelector('.search-results-top');
    searchResultsGuruElement = document.querySelector('.search-results-gurus');
    bannerElement = document.querySelector('#banner');
    numGurusElement = document.querySelector('#search-guru-number');
    searchResultsBackgroundMap = document.querySelector('.search-results-map');
    popularCoursesParent = document.querySelector('.search-results-courses ul.text-center');
    console.log(uni_data)

    if (popularCoursesParent && uni_data.popular_courses && uni_data.popular_courses.length) {
        popularCoursesParent.innerHTML = '';
        popularCourses = uni_data.popular_courses;

        if (popularCourses.length > 11) {
            popularCourses = popularCourses.slice(0,11);
        }

        for (var i = 0 ; i < popularCourses.length; i ++) {
            var courseNode = document.createElement("li");
            courseNode.innerHTML = popularCourses[i];
            popularCoursesParent.appendChild(courseNode);
        }
        var courseNode = document.createElement("li");
        courseNode.innerHTML = 'and more';
        popularCoursesParent.appendChild(courseNode);
    }

    if (schoolNameElement && uni_data.name) {
        schoolNameElement.innerHTML = uni_data.name;
    }
    if (bannerElement && uni_data.banner_url) {
        bannerElement.style.backgroundImage = 'url(' + uni_data.banner_url + ')';
    }
    if (schoolLogoElement && uni_data.logo_url) {
        schoolLogoElement.src = uni_data.logo_url;
    }
    if (numGurusElement && uni_data.population) {
        populationString = uni_data.population.toString();
        if (populationString.length == 5) {
            numGurusElement.innerHTML = populationString.substring(0,2) + 'k';
        } else {
            numGurusElement.innerHTML = populationString.substring(0,1) + 'k';
        }

        guruTextSpan = document.querySelector('.search-results-gurus span')

        guruTextSpan.innerHTML = 'students';
    }
    if (searchResultsBgBannerElement && uni_data.school_color_one) {
        searchResultsBgBannerElement.style.backgroundColor = uni_data.school_color_one;
    }
    if (schoolBannerOuterBorder && uni_data.school_color_one) {
        schoolBannerOuterBorder.style.fill = uni_data.school_color_one;
    }
    if (schoolBannerInnerBorder && uni_data.school_color_two) {
        schoolBannerInnerBorder.style.fill = uni_data.school_color_two;
    } else {
        schoolBannerInnerBorder.style.fill = uni_data.school_color_one;
    }
    if (searchResultsGuruElement && (uni_data.school_color_one || uni_data.school_color_two)) {
        searchResultsGuruElement.style.backgroundColor = uni_data.school_color_one;
        if (uni_data.school_color_two && uni_data.school_color_two.length) {
            searchResultsGuruElement.style.backgroundColor = uni_data.school_color_one;
        }
    }
    //population
    //Map latitude longitude
    if (postSearchCallback) {
        postSearchCallback();
        setTimeout(function() {
            if (searchResultsBackgroundMap && uni_data.latitude && uni_data.longitude)  {
                searchResultsBackgroundMap.style.backgroundImage = constructStaticGMapBackground(uni_data.latitude, uni_data.longitude);
            }
        }, 200)
    }
}
</script>