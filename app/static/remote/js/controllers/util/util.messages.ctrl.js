angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentMessagesController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$cordovaProgress',
  '$stateParams',
  '$cordovaKeyboard',
  '$ionicScrollDelegate',
  function($scope, $state, $timeout, $localstorage, 
  $ionicModal, $ionicTabsDelegate, $cordovaProgress,
  $stateParams, $cordovaKeyboard, $ionicScrollDelegate) {

    $scope.default_img_one = "https://scontent-a-lax.xx.fbcdn.net/hphotos-xpf1/t31.0-8/10562663_885963074765104_3921025689053196901_o.jpg";
    $scope.default_img_two = "https://scontent-a-lax.xx.fbcdn.net/hphotos-xpa1/t31.0-8/10520798_883807624993289_354037221863580422_o.jpg"
    
    // $scope.session = JSON.parse($stateParams.sessionObj);
    // console.log($scope.session);
    $scope.new_message = {content: ''};

    $scope.messages = [
      {
        'img_src': $scope.default_img_one,
        'content': "Pam~, How have you been?",
        'class': 'you'
      },
      {
        'img_src': $scope.default_img_two,
        'content': "I'm fine, just been chilling not really caring about anything",
        'class': 'sender'
      },
      {
        'img_src': $scope.default_img_two,
        'content': "How have you been?",
        'class': 'sender'
      },
      {
        'img_src': $scope.default_img_one,
        'content': "I'm fine  I was a bit busy hihi  I am a Japanese teacher now! At my school. For the basics of the Japanese language ",
        'class': 'you'
      },
      {
        'img_src': $scope.default_img_two,
        'content': "Really?! If you are a  Japanese teacher, you can make students want to go to Japan!",
        'class': 'sender'
      },
      {
        'img_src': $scope.default_img_one,
        'content': "Yes. That is exactly what I'm goign to do.",
        'class': 'you'
      },
      {
        'img_src': $scope.default_img_one,
        'content': "But only if you come with me ;)",
        'class': 'you'
      },
      {
        'img_src': $scope.default_img_one,
        'content': "Experience won't be same without you...",
        'class': 'you'
      },
      {
        'img_src': $scope.default_img_two,
        'content': "Hmmm...",
        'class': 'sender'
      },
    ]

    $scope.setFocus = function() {
      document.getElementsByName('message-input')[0].focus();
    }

    // $scope.setFocus = function(event) {
    //   document.getElementsByName("message-input")[0].focus();
    // };

    $scope.sendMessage = function (content) {

      $timeout(function(){
        $scope.messages.push({
          'content':content,
          'class': 'you', // Try "fadeInUp" if you don't like bounceInUp.
          'img_src': $scope.default_img_one
        })
        $ionicScrollDelegate.$getByHandle('message-scroll').scrollBy(0, 200, true);
      }, 100)

      // animated bounceInUp

      $scope.new_message.content = '';
      // $scope.root.keyboard.close();
    }
    $scope.$on('$ionicView.enter', function(){
      
      console.log('view has entered');
      $scope.root.keyboard.show('message-input', 500);
      
      $timeout(function() {
        $ionicScrollDelegate.$getByHandle('message-scroll').scrollBy(0, 600);
        // $cordovaKeyboard.disableScroll(false);
        
      },500);
    });

  }

]);

