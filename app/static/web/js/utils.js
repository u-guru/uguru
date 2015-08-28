/*
    Triggers any event, potentially already having a listener
*/
var dispatchEvent = function(str, data) {
    console.log('sup');
    data = data || {}; // initializes data

    var event = new CustomEvent(str, data);

    document.body.dispatchEvent(event);
}