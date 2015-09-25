/*
    Triggers any event, potentially already having a listener
*/
var dispatchEvent = function(str, data) {
    console.log('sup');
    data = data || {}; // initializes data

    var event = new CustomEvent(str, data);

    document.body.dispatchEvent(event);
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

// $(document).ready(function() {

//     var dict = {
//         id: 2602,
//         latitude: 40.7220719,
//         logo_url: "http://i.forbesimg.com/media/lists/colleges/adelphi-university_50x50.jpg",
//         longitude: -73.6506244,
//         name: "Adelphi University",
//         popular_courses: Array[13],
//         population: 7645,
//         rank: 149,
//         school_color_one: "#591f00",
//         school_color_two: "#fdb813",
//         state: "NY"
//     }

//     var successCallback = function() {
//             itemSelectedGlobal = true;
//             showSearchResultsCallback(dict);
//             setTimeout(function() {
//                 $('.search-results .front').trigger('click');
//                 $('.search-results .front, .search-results').unbind('click');
//             }, 500)
//         }
//     setTimeout(function() {
//         customizeSearchResults(dict, successCallback);
//     }, 200)

// })