describe("StudentHomeController Unit Tests", function () {

    beforeEach(module('uguru'));

    beforeEach(angular.mock.inject(function($rootScope, $injector, $controller) {
        $scope = $rootScope.$new();
        //add other components to users (customer user and shit);
        $controller('StudentHomeController', {$scope: $scope});
    }));

    it("should have a scope variable defined", function() {
        expect($scope.progress_active).toBe(false);
    });

});