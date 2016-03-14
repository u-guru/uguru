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
        console.log($scope.user.guru_relationships)
    }

    function initUser() {
        var baseUser =  generateFakeRandomGuru();
        baseUser.guru_relationships = [];
        return baseUser;
    }

    $scope.user = initUser();

    $scope.$on('$ionicView.loaded', function() {
        console.log('DEVCONTROLLER: state is currently ', _state);
        switch (_state) {
            case 'messaging':
                initMessagingState($scope.user);
        }
    })

  }
])