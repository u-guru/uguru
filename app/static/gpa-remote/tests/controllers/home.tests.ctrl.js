describe("HomeController Unit Tests", function () {

    beforeEach(module('uguru'));

    beforeEach(angular.mock.inject(function($rootScope, $injector, $controller) {
        $scope = $rootScope.$new();
        //add other components to users (customer user and shit);
        $controller('HomeController', {$scope: $scope});
    }));
    console.log('====WORKFLOW ONE====\n')
    it("should have a scope variable defined", function() {
        expect($scope).toBeDefined();
    });

});