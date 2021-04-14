$stateProvider.state('myState', {
    resolve: {

        // Example using function with simple return value.
        // Since it's not a promise, it resolves immediately.
        simpleObj: function () {
            return { value: 'simple!' };
        },

        // Example using function with returned promise.
        // This is the typical use case of resolve.
        // You need to inject any services that you are
        // using, e.g. $http in this example
        promiseObj: function ($http) {
            // $http returns a promise for the url data
            return $http({ method: 'GET', url: '/someUrl' });
        },

        // Another promise example. If you need to do some 
        // processing of the result, use .then, and your 
        // promise is chained in for free. This is another
        // typical use case of resolve.
        promiseObj2: function ($http) {
            return $http({ method: 'GET', url: '/someUrl' })
               .then(function (data) {
                   return doSomeStuffFirst(data);
               });
        },

        // Example using a service by name as string.
        // This would look for a 'translations' service
        // within the module and return it.
        // Note: The service could return a promise and
        // it would work just like the example above
        translations: "translations",

        // Example showing injection of service into
        // resolve function. Service then returns a
        // promise. Tip: Inject $stateParams to get
        // access to url parameters.
        translations2: function (translations, $stateParams) {
            // Assume that getLang is a service method
            // that uses $http to fetch some translations.
            // Also assume our url was "/:lang/home".
            translations.getLang($stateParams.lang);
        },

        // Example showing returning of custom made promise
        greeting: function ($q, $timeout) {
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve('Hello!');
            }, 1000);
            return deferred.promise;
        }
    },

    // The controller waits for every one of the above items to be
    // completely resolved before instantiation. For example, the
    // controller will not instantiate until promiseObj's promise has 
    // been resolved. Then those objects are injected into the controller
    // and available for use.  
    controller: function ($scope, simpleObj, promiseObj, promiseObj2, translations, translations2, greeting) {
        $scope.simple = simpleObj.value;

        // You can be sure that promiseObj is ready to use!
        $scope.items = promiseObj.items;
        $scope.items = promiseObj2.items;

        $scope.title = translations.getLang("english").title;
        $scope.title = translations2.title;

        $scope.greeting = greeting;
    }
})