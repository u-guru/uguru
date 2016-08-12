angular.module('uguru.directives')
.directive('iframeOnload', [function($timeout, LoadingService){
return {
    scope: {
        callBack: '&iframeOnload'
    },
    link: function(scope, element, attrs){
        element.on('load', function(){
            return scope.callBack();
        })
    }
}}])