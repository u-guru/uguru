var parse_mandrill_user_agent = function(ua_string) {
    var ua_tuple = [];
    if (ua_string.toLowerCase().indexOf('mobile') !== -1) {
        ua_tuple[0] = 'Mobile';
    } else {
        ua_tuple[0] = 'Desktop';
    }

    if (ua_string.toLowerCase().indexOf('chrome') !== -1) {
        ua_tuple[1] = 'Chrome';
    }
    else if (ua_string.toLowerCase().indexOf('safari') !== -1) {
        ua_tuple[1] = 'Safari';
    } else if (ua_string.toLowerCase().indexOf('firefox') !== -1) {
        ua_tuple[1] = 'Firefox';
    } else {
        ua_tuple[1] = 'Other';
    }

    return ua_tuple;
}