angular.module('uguru.root.services')
.service('Push', 
    [
    '$localstorage',
    '$timeout',
    '$cordovaPush',
    'RootService',
    function($localstorage, $timeout, $cordovaPush, RootService) {
        
        pushFunction = {
                    getPushAccessIOS: function($scope, callback) {

                        
                        $cordovaPush.register(config).then(function(result) {
                            // Success -- send deviceToken to server, and store for future use
                            console.log("result: " + result)
                              
                            $scope.user.ios_token = result;

                        
                        }, function(err) {
                            

                          console.log(err);

                        });

                    };

        return pushFunction; 
    
}]);