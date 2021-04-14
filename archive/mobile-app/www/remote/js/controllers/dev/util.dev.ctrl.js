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

    function generateSeveralFakeMessages(user, guru) {
        var randomNum = getRandomInt(25, 50);
        var resultMessages = [];
        for (var i = 0; i < randomNum; i++) {
            resultMessages.push(generateRandomMessageObj(i, guru, user));
        }
        function generateRandomMessageObj(id, guru, user) {
            var longMessageString = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
            var messageLengthWords = getRandomInt(3, 50);
            var resultMessageString = longMessageString.split(' ').splice(0, messageLengthWords)
            var resultMessageString = resultMessageString.join(' ');
            var randomSenderReceiverArr = [];
            for (var i = 0; i < messageLengthWords; i++) {
                if (i % 2 === 0) {
                    randomSenderReceiverArr.push(guru);
                } else {
                    randomSenderReceiverArr.push(user);
                }
            }
            var sender = randomSenderReceiverArr[getRandomInt(0, randomSenderReceiverArr.length - 1)];
            return {
                id: id,
                contents: resultMessageString,
                sender: sender,
                time_created: 'seconds ago'
            }
        }
        return resultMessages;
    }

    function generateFakeRelationship(index, user) {
        var guru = generateFakeRandomGuru();
        guru.files = generateRandomFilesForUser(guru);
        return {
            guru: guru,
            messages: generateSeveralFakeMessages(user, guru),
            nav: {
                menu: {
                    active_index: 0
                }
            },
            id: index,
            files: generateRelationshipFiles(user, guru)
        }
    }

    function generateRelationshipFiles(user, guru) {
        var resultFiles = [];
        var guruIndex = 0;
        var studentIndex = 0;
        var maxInt = getRandomInt(10, 14)
        for (var i = 0; i < maxInt; i++) {
            if (i % 2 === 0) {
                resultFiles.push(guru.files[guruIndex]);
                guruIndex++;
            } else {
                resultFiles.push(user.files[studentIndex]);
                studentIndex++;
            }
        }
        return resultFiles
    }

    function generateRandomFilesForUser(user) {
        var resultFiles = [];
        var numFiles = getRandomInt(10, 20);
        for (var i = 0; i < numFiles; i++) {
            resultFiles.push(generateRandomFile(i, user));
        }

        function generateRandomFile(i, user) {
            var fileTypes = ['pdf', 'txt', 'doc', 'jpg', 'gdoc', 'ppt'];
            return {
                id: i,
                name: 'File #' + i,
                type: fileTypes[getRandomInt(0, fileTypes.length - 1)],
                time_created: (i + getRandomInt(0, 10)) + 'days ago',
                user: {
                    id: user.id
                }
            }
        }
        return resultFiles;
    }


    function initMessagingState(user) {
        user.files = generateRandomFilesForUser(user);
        user.guru_relationships = [];
        for (var i = 0; i < 10; i++) {
            user.guru_relationships.push(generateFakeRelationship(i, user))
        }

        $scope.active_relationship = user.guru_relationships[0];
        $scope.showAttachments = false;
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
        var MENU_TITLES = ['Messages', 'Location', 'Files', 'Calendar', 'Sessions', 'Billing History', 'Create a Request'];

        function initActiveRelationship(relationship) {
            relationship.nav = initRelationshipNav(relationship);
        }

        function initRelationshipNav(relationship) {
            return {
              menu: {
                show: false, //displayed
                active_index: 0
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
    $scope.lifecycle = {
        url: $scope.img_base + 'templates/dev/docs/lifecycle.tpl',
        header: 'Steps to a HiFi Component',
        steps: [
          {title: 'Step 1', description: 'here is a description'}
        ]
      }
    initMessagingState($scope.user);

  }
])