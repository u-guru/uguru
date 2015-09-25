"use strict";

var CountryCodes = {
    US: '1'
};

function removeNonNumerics(value){
    return value.replace(/[^0-9]/g, '');
}

function startsWith(str, starts){
    if(starts.length > str){
        return false;
    }
    var end = starts.length;
    while(end--){
        if(str[end] != starts[end]){
            return false;
        }
    }
    return true;
}

function shouldPrependCountryCode(value){
    return (value.length === 10);
}

function prependCountryCode(value){
    if(shouldPrependCountryCode(value)){
        value = CountryCodes.US + value;
    }
    return value;
}

function prependIfAbsent(str, prepend){
    if(!startsWith(str, prepend)){
        str = prepend + str;
    }
    return str;
}

function convertToAmericanNumber(value){
    return prependIfAbsent(prependCountryCode(value), '+');
}

/**
 * Converts it to american number
 * @param value
 * @returns {*}
 */
function normalizePhoneNumber(value){
    return convertToAmericanNumber(removeNonNumerics(value));
}
// exports.normalize  = normalizePhoneNumber;

/**
 *
 * @param phone
 * @returns {boolean}
 */
function isPhoneNumberValid(phone){
    phone = normalizePhoneNumber(phone);
    var isMatch =  !!phone.match(/^\+\d{11}$/);
    return(isMatch);
}
// exports.isValid = isPhoneNumberValid;