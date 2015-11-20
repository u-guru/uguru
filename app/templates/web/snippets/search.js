<script>
$(function () {

$("#search-box").slideDown();
    $('#search-bar').focus(function(e) {
        $("#top-school-banner").css("width", "60%");
        if ($('#search-bar').val().length >= 0) {
            $("#search-results").slideDown();
            $("#search-box").css('top', '30%');
        }
    });
    $('#search-bar').keypress(function() {
        if ($('#search-bar').val().length > 0) {
            $('#search-results').hide();
        }
    });
    $("#search-bar").focus(function(){
        $('#top-school-banner').css('width','30%');
    });
    $("#search-bar").blur(function(){
        setTimeout(function() {
            $("#search-box").css('top', '50%');
            $("#search-results").slideUp();
            // $("#top-school-logo, #top-school-banner").css("width", "100%");
            $("#search-box").css({
                "-webkit-transform": "translateX(-50%)",
                "-moz-transform": "translateX(-50%)",
                "-ms-transform": "translateX(-50%)",
                "-o-transform": "translateX(-50%)",
                "transform": "translateX(-50%)"
            });
        }, 100);
    });

    $('#search-box').on("mouseover", function(e) {
        //check if mouse is still over the bar after 500 seconds
        setTimeout(function(){
            if ($('#search-box').is(':hover')
                //&& !$('#search-bar').val().length
                )
            {
                $('#search-bar').focus();
            }
        }, 500);
    });
    $('#search-box').on("mouseleave", function(e) {
        setTimeout(function() {
            if (!$('#search-box').is(':hover') && !$('#search-bar').val().length && !itemSelectedGlobal) {
                $('#search-bar').blur();
                $('#top-school-banner').css("width", "60%");
            }
        }, 500)
    });
    $("#search-results").on("click", "li", function(e) {
        /* SAMIR - ELEMENTS THAT NEED TO CHANGE
            #top-school-logo - src (svg)
            #border-inner - fill (color)
            .search-results-top - background (color)
            .search-results-guru - background (color)
            .search-results-map - background (map, depends on static vs. dynamic)
            #banner - background (school photo from flickr)
            #search-school-name - text (school name)
            #search-guru-number - text (number of gurus)
            .search-results-courses ul li - text (course names), background (see index.html comments)
        */
        itemSelectedGlobal = true;
        searchResultsBackgroundMap = document.querySelector('.search-results-map');
        numGurusElement = document.querySelector('#search-guru-number');
        popularCoursesParent = document.querySelector('.search-results-courses ul.text-center');
        popularCoursesParent.innerHTML ='';
        
        platformElement = document.querySelector('.start-modal-platforms');
        platformHeaderElement = document.querySelector('.modal-main-container header');
        platformSVGElement = document.querySelectorAll('.start-modal-platforms svg path');
        
        $("#border-outer").css("fill", "white");
        $("#top-school-banner").css("width", "20%");
        $('#top-school-logo').css("width","auto");
        if ($(this).is('#search-berkeley')) {
            var color = "rgb(0, 50, 98)";
            $('#banner').css("background-image", "url(" + 'https://farm8.staticflickr.com/7143/6841501153_7eb07da0c4_b.jpg' + ")");
            $("#top-school-logo").attr('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/64px-Seal_of_University_of_California%2C_Berkeley.svg.png');
            $("#border-inner").css("fill", color);
            $(".search-results-top, .search-results-gurus, .search-results-courses").css("background", color);
            $("#search-school-name").text("UC BERKELEY");

            numGurusElement.innerHTML = '30k+';
            popularCourses = ["STATS20", "ASTROC10", "COS126", "ASTRONC10", "CHEM3A", "CHEM3AL",
                "MCB61", "PSYCHC19","CS61A", "BIO 1A", "PSYCH 1"];

            for (var i = 0 ; i < popularCourses.length; i ++) {
                var courseNode = document.createElement("li");
                courseNode.innerHTML = "<span class='course'>" + popularCourses[i] + "</span><span class='color' style='background: " + color + "'></span>";
                popularCoursesParent.appendChild(courseNode);
            }
            var courseNode = document.createElement("li");
            courseNode.innerHTML = '<span class="course">and more</span><span class="color" style="background: ' + color + '"></span>';
            popularCoursesParent.appendChild(courseNode);
            
            platformElement.style.backgroundColor = color;
            platformHeaderElement.style.backgroundColor = color;
            for (var i = 0; i < platformSVGElement.length; i++) {
                var indexSVGElem = platformSVGElement[i];
                indexSVGElem.style.fill = color;
            }

            var successCallback = function() {
                setTimeout(function() {
                    searchResultsBackgroundMap.style.backgroundImage = constructStaticGMapBackground(37.8718992,-122.2585399);
                }, 200)
            }

            animateSearchBoxResults(CalColor, successCallback);


        } else if ($(this).is('#search-florida')) {
            var color = "rgb(255, 74, 0)";
            $('#banner').css("background-image", "url(" + 'https://farm8.staticflickr.com/7206/6858631913_1fee1210b4_b.jpg' + ")");
            $("#top-school-logo").attr('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/University_of_Florida_Seal.png/64px-University_of_Florida_Seal.png');
            $("#border-inner").css("fill", color);
            $(".search-results-top, .search-results-gurus, .search-results-courses").css("background", color);
            $("#search-school-name").text("University of Florida");
            
            numGurusElement.innerHTML = '49k';
            popularCourses = ["SOP2772","PSY2012","PHY2012","SOP3723","PSY2000","ANT2511","ANT2000", "CGS2100",
            "CGS2100C","CGS3200","CNT3004"];
            
            for (var i = 0 ; i < popularCourses.length; i ++) {
                var courseNode = document.createElement("li");
                courseNode.innerHTML = "<span class='course'>" + popularCourses[i] + "</span><span class='color' style='background: " + color + "'></span>";
                popularCoursesParent.appendChild(courseNode);
            }
            var courseNode = document.createElement("li");
            courseNode.innerHTML = '<span class="course">and more</span><span class="color" style="background: ' + color + '"></span>';
            popularCoursesParent.appendChild(courseNode);
            
            platformElement.style.backgroundColor = color;
            platformHeaderElement.style.backgroundColor = color;
            for (var i = 0; i < platformSVGElement.length; i++) {
                var indexSVGElem = platformSVGElement[i];
                indexSVGElem.style.fill = color;
            }

            var successCallback = function() {
                setTimeout(function() {
                    searchResultsBackgroundMap.style.backgroundImage = constructStaticGMapBackground(29.6436325,-82.3549302);
                }, 200)
            }

            animateSearchBoxResults(UFColor, successCallback);
        } else if ($(this).is('#search-tufts')) {
            var color = "#417dc1";
            $('#banner').css("background-image", "url(" + 'http://c2.staticflickr.com/6/5097/5514096962_ee022a89d4_b.jpg' + ")");
            $("#top-school-logo").attr('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Tufts_University_seal.svg/64px-Tufts_University_seal.svg.png');
            $("#border-inner").css("fill", color);
            $(".search-results-top, .search-results-gurus, .search-results-courses").css("background", color);
            $("#search-school-name").text("Tufts University");
            
            popularCourses = ["ECON102","MICRO101", "ECON1","EC005", "CHEM01", "CHEM1,2", "PS061","PS0061", "ECON5", "PS189-04", "EC0N2"];
            numGurusElement.innerHTML = '10k';
            
            for (var i = 0 ; i < popularCourses.length; i ++) {
                var courseNode = document.createElement("li");
                courseNode.innerHTML = "<span class='course'>" + popularCourses[i] + "</span><span class='color' style='background: " + color + "'></span>";
                popularCoursesParent.appendChild(courseNode);
            }
            var courseNode = document.createElement("li");
            courseNode.innerHTML = '<span class="course">and more</span><span class="color" style="background: ' + color + '"></span>';
            popularCoursesParent.appendChild(courseNode);
            
            platformElement.style.backgroundColor = color;
            platformHeaderElement.style.backgroundColor = color;
            for (var i = 0; i < platformSVGElement.length; i++) {
                var indexSVGElem = platformSVGElement[i];
                indexSVGElem.style.fill = color;
            }

            var successCallback = function() {
                setTimeout(function() {
                    searchResultsBackgroundMap.style.backgroundImage = constructStaticGMapBackground(42.4074843,-71.1190232);
                }, 200)
            }

            animateSearchBoxResults(UFColor, successCallback);
        }
    });

});
</script>