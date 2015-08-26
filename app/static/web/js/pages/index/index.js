<script>
    var all_universities;

    var matcher;

    $(document).ready(function() {
        universities_arr = readAndParseJSON('/static/data/universities_web3.json');
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
            selector: 'title',

            // duh, what do you think this does?
            caseInsensitive: true,

            // return matches in their original order
            preserveOrder: false,

            // whether to match against any word (not just first) for each string
            anyWord: true,

            // how many matches to find at a time
            limit: 5
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
                    '<a href="http://goo.gl/forms/UQ7WcYl3sb" class="university-link" target="_blank"><div><img class="pure-img" src="/static/img/guru-logo-red.svg"/></div><div><h2><span class="title">No results found (yet!) </span> Click to Bring Uguru to Your University / School</h2></div></a>',
                    '</div>'
                ].join('\n'),
                suggestion: Handlebars.compile("<div><img src='{{thumbnail.source}}' alt=''/></div><div><h2>{{title}}</h2><p>{{city}}, {{state}}, USA</p></div>")
            }
        }).on('typeahead:selected', function(event, suggested, dataset_name) {
            console.log('yo')
                //make it wobble
        }).on('typeahead:cursorchanged', function(event, suggested, dataset_name) {
            $('.tt-suggestion.tt-cursor img').addClass('animated wobble');
        });
    };

    {% endraw %}
</script>