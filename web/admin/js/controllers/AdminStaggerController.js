angular.module('uguru.admin')

.controller('AdminStaggerController', [
'$scope',
'$state',
'$timeout',
'$localstorage',
'$compile',
'$http',
'DirectiveService',
function($scope, $state, $timeout, $localstorage, $compile, $http, DirectiveService) {

	var stagger = this;
	stagger.examples = getStaggerExamples();
	stagger.activeIndex = 0;
    stagger.data = {use_cases:[], activeIndex: -1}

    $timeout(function() {
        init($scope);
    }, 500)

    stagger.updateActiveIndex = function(index) {

        var elem = document.querySelector('#demo-controller')
        elem.style.opacity = 0;
        stagger.data.activeIndex = index;
        $scope.stagger.data.activeExample = updateExampleGUI($scope.stagger.data.activeIndex, $scope.stagger.data.use_cases);
        // console.log($scope.stagger.data.activeExample);
        var getValuesFunc = DirectiveService.applyMappingDelayFuncToFutureChildren('onEnter', $scope.stagger.data.activeExample.time);

        getValuesFunc(angular.element(elem).children(), $scope.stagger.data.activeExample.time, $scope.stagger.data.activeExample.selector[0])
        console.log($scope.stagger.data.activeExample)

    }
    function init(scope) {
        var elem = document.querySelector('#demo-controller')
        elem.style.opacity = 0;
        getStaggerDocs(scope);
        scope.$watch('stagger.data.use_cases', function(_new) {
            $timeout(function(){
                scope.$apply();
            })
        })


        scope.$watch('stagger.data.activeIndex', function(_new) {

            if (_new === -1 || !scope.stagger.data) return;






            var elem = document.querySelector('#demo-controller')
            var staggerStr = '<stagger-children>' + elem.innerHTML + '</stagger-children>'
            // var elemDisplayTemp = window.getComputedStyle(elem)['display']

            // elem.style.display = 'none';
            elem.innerHTML = staggerStr;
            $timeout(function() {
                // $scope.stagger.data.activeIndex = _new;
                var elem = document.querySelector('#demo-controller > stagger-children')

                elem.setAttribute('on-enter', scope.stagger.data.use_cases[scope.stagger.data.activeIndex].example)
                if ($scope.stagger.data && !$scope.stagger.data.activeExample) {
                            $scope.stagger.data.activeExample = updateExampleGUI($scope.stagger.data.activeIndex, $scope.stagger.data.use_cases);
                            // console.log($scope.stagger.data.activeExample);
                            var getValuesFunc = DirectiveService.applyMappingDelayFuncToFutureChildren('onEnter', $scope.stagger.data.activeExample.time);

                            getValuesFunc(angular.element(elem).children(), $scope.stagger.data.activeExample.time, $scope.stagger.data.activeExample.selector[0])
                        }
                $timeout(function() {
                    elem.parentNode.style.opacity = 1;
                    $compile(elem)($scope);
                    $timeout(function() {


                         // stagger.updateActiveIndex
                         // if ( !$scope.stagger.data.activeExample) {
                         //    stagger.updateActiveIndex(_new)
                            // $scope.stagger.data.activeExample
                            // $scope.stagger.data.activeExample = updateExampleGUI($scope.stagger.data.activeIndex, $scope.stagger.data.use_cases);
                            // // console.log($scope.stagger.data.activeExample);
                            // var getValuesFunc = DirectiveService.applyMappingDelayFuncToFutureChildren('onEnter', $scope.stagger.data.activeExample.time.options);

                            // getValuesFunc(angular.element(elem).children(), $scope.stagger.data.activeExample.time, $scope.stagger.data.activeExample.selector)
                         // }
                    })

                }, 500)


                // elem.style.display = elemDisplayTemp;
            })


            // stagElem.setAttribute('on-enter', scope.stagger.data.use_cases[_new].example)
            // console.log()
            // if ()
            // var elem = document.querySelector('#player-stage');
            // $compile(angular.element(elem))(scope)
            // console.log(re)

            // stagger.data.activeExample = parseExample(stagger.data.use_cases[_new].example)
        })
    }

    function parseExample(example) {
        if (!example) return;
        var resultDict = {};
        var staggerArgs = example.split(':');
        resultDict.selector = staggerArgs.shift();
        resultDict.state = 'on-enter'
        var nextArg = staggerArgs.shift();
        if (nextArg.indexOf('[') > -1 &&  nextArg.indexOf(']') > -1) {
            resultDict.time = nextArg;
            resultDict.easing = 'linear';
        }
        return resultDict

    }

	function getStaggerExamples() {
		return [
			{name: 'simple'},
			{name: 'easing'}
		]
	}

    function updateExampleGUI(index, use_cases) {
        var result = DirectiveService.processStaggerArgs({onEnter: use_cases[index].example});
        console.log(result);
        return result.onEnter
    }

    function getStaggerDocs(scope) {
        return $http.get('admin/spec/api/stagger.json').success(function(data) {
            scope.stagger.data.use_cases = data.use_cases;
            scope.stagger.data.activeIndex = data.activeIndex;
            // scope.stagger.renderExample = true;
            // var elem = document.querySelector('#player-stage');



            // var args = DirectiveService.processStaggerArgs({onEnter: })
            console.log(scope.stagger.data.activeExample)

            // var elem = document.querySelector('#player-stage');
            // $compile(angular.element(elem))(scope)

            // // elem
            // $timeout(function() {
            //     scope.$apply();
            // }, 100)
        });
    }

}

])
