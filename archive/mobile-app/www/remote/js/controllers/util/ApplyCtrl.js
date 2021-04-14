angular.module('uguru.util.controllers')

.controller('ApplyController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$timeout',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $timeout) {

    $scope.page = {
      header: {text: "We looked at other pricing models..", state:0}
    }

    $scope.section = {
      one:  {
                header:"An all-in-one full stack internship for students",
                attr: [
                  {subheader: "Social Media", body: "Be responsible for several universities at once", icon: "lightning/power"},
                  {subheader: "UX", body: "Speak directly on-campus with users"},
                  {subheader: "Market Intelligence", body: "If you are not located within 20m of SF"},
                  {subheader: "HR & Recruiting", body: "Balance is important"},
                  {subheader: "Marketing", body: "Strategize & implement go-to-market solutions"},
                  {subheader: "Business Development", body: "strike partnerships with local businesses"},
                  {subheader: "Web + Mobile Analytics", body:"assist making direct product decisions "},
                  {subheader: "Customer Support", body:"represent the brand, help other students ace school"},
                ],
            },
      two:  {
                header:"With great, expensed, perks",
                attr: [
                  {subheader: "4G LTE", body: "Unlimited Data Hotspot on us", icon: "lightning/power"},
                  {subheader: "Bonus Stipend", body: "If exceeds performance"},
                  {subheader: "Includes Room + Board", body: "If you are not located within 20m of SF"},
                  {subheader: "Gym Membership", body: "Balance is important"},
                  {subheader: "Groceries"}
                ],
            },
      three:  {
                header:"This adventure is ...",
                attr: [
                  {subheader: "For students", body: "high school or college"},
                  {subheader: "3 months", body: "length of internship"},
                  {subheader: "Part Time", body: "20 hours / week"},
                  {subheader: "Full Time", body: "40 hours / week"},
                ],
            }
    }

    $timeout(function() {
     $scope.page.header.state = 1;
    }, 4000)


    $scope.questions = [

      {
        header: "Tutors can set their own prices.",
        body: "Their maximum increases as they build reportaire. Their maximum increases as they build reportaire.Their maximum increases as they build reportaire.Their maximum increases as they build reportaire."
      },
      {
        header: "Tutors can set their own prices.",
        body: "Their maximum increases as they build reportaire. Their maximum increases as they build reportaire.Their maximum increases as they build reportaire.Their maximum increases as they build reportaire."
      },
      {
        header: "Tutors can set their own prices.",
        body: "Their maximum increases as they build reportaire. Their maximum increases as they build reportaire.Their maximum increases as they build reportaire.Their maximum increases as they build reportaire."
      },
      {
        header: "Tutors can set their own prices.",
        body: "Their maximum increases as they build reportaire."
      },

    ];

  }


])