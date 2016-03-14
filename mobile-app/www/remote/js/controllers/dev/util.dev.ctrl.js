var state;
angular.module('uguru.dev.controllers', [])

.controller('DevController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  function($scope, $state, $timeout, $localstorage) {
    var randomGurusAlreadySelected = [];

    $scope.img_base = 'https://uguru-rest-test.herokuapp.com/static/remote/';
    //generate fake gurus
    //scope out the entire scope
    //

    function getRandomInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    function generateFakeRandomGuru() {
        var names = ['Tom', 'Mike', 'Matt', 'Jessica', 'Anna Lisa', 'Brian'];
        var maxSampleIndex = 23;


        var profileURLIndex = getRandomInt(1, 23);
        if (randomGurusAlreadySelected.indexOf(profileURLIndex) > -1) {
            return generateFakeRandomGuru();
        }
        randomGurusAlreadySelected.push(profileURLIndex);
        if (profileURLIndex < 10) {
            profileURLIndex = '00' + profileURLIndex
        } else if (profileURLIndex >= 9 && profileURLIndex < 20) {
            profileURLIndex = '0' + profileURLIndex
        }
        else {
            profileURLIndex = '0' + profileURLIndex;
        }
        return {
            name: names[getRandomInt(0, names.length - 1)],
            profile_url: $scope.img_base + 'img/sample/avatars/' + profileURLIndex + '.jpg',
            id: profileURLIndex
        }
    }

    function generateFakeRelationship(index) {
        return {
            guru: generateFakeRandomGuru(),
            nav: {
                menu: {
                    active_index: 0
                }
            },
            id: index
        }
    }




    function initMessagingState(user) {

        user.guru_relationships = [];
        for (var i = 0; i < 10; i++) {
            user.guru_relationships.push(generateFakeRelationship(i))
        }
        $scope.active_relationship = user.guru_relationships[0];
        $timeout(function() {
            initActiveRelationship($scope.active_relationship);
        }, 500)

        $scope.student_search = {search_text: ''};
        $scope.setToActiveRelationship = function(relationship) {
            $scope.active_relationship = relationship;
            initActiveRelationship(relationship)
        }
        $scope.toggleActiveRelationshipMessageNav = function() {
            $scope.active_relationship.msg_nav = !$scope.active_relationship.msg_nav;

        }
        var MENU_TITLES = ['Messages', 'Location', 'Calendar', 'Files', 'Sessions', 'Billing History', 'Create a Request'];

        function initActiveRelationship(relationship) {
            relationship.nav = initRelationshipNav(relationship);
        }

        function initRelationshipNav(relationship) {
            return {
              menu: {
                show: false, //displayed
                active_index: 1,
              },
              menu_titles: MENU_TITLES
            }
          }
    }

    function initUser() {
        var baseUser =  generateFakeRandomGuru();
        baseUser.guru_relationships = [];
        return baseUser;
    }

    $scope.user = initUser();
    initMessagingState($scope.user);

  }
])