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

    function init(scope) {
        getStaggerDocs(scope);
        scope.$watch('stagger.data.use_cases', function(_new) {
            $timeout(function(){
                scope.$apply();
            })
        })

        scope.$watch('stagger.data.activeIndex', function(_new) {

            if (_new === -1 || !scope.stagger.data) return;

            // var recentlyClicked = scope.stagger.data.use_cases[_new];
            scope.stagger.data.use_cases = scope.stagger.data.use_cases;
            scope.stagger.data.activeIndex = scope.stagger.data.activeIndex;


            // if (!recentlyClicked) return;
            scope.stagger.data.activeExample = updateExample(scope.stagger.data.activeIndex, scope.stagger.data.use_cases);
            var elem = document.querySelector('#player-stage');
            $compile(angular.element(elem))(scope)
            // console.log(re)

            // stagger.data.activeExample = parseExample(stagger.data.use_cases[_new].example)
        })
        // $timeout(function() {
        //     stagger.data.activeExample = parseExample(scope.stagger.data.use_cases[scope.stagger.data.activeIndex].example)
        // }, 1000)
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
        // if (staggerArgs.length == 3) {
        //     console.log(staggerArgs)
        // }
        return resultDict

    }

	function getStaggerExamples() {
		return [
			{name: 'simple'},
			{name: 'easing'}
		]
	}

    function updateExample(index, use_cases) {
        return DirectiveService.processStaggerArgs({onEnter: use_cases[index].example}).onEnter
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
