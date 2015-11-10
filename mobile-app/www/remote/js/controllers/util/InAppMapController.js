// angular.module('uguru.util.controllers')
// .controller('InAppMapController', [
//   '$scope',
//   '$ionicSideMenuDelegate',
//   '$timeout',
//   InAppMapController]);

// function InAppMapController($scope, $ionicSideMenuDelegate, $timeout) {

//   if ($ionicSideMenuDelegate.isOpen()){
//     console.log("side menu is open");
//     $timeout(function() {
//       $ionicSideMenuDelegate.toggleRight();
//     }, 200);
    
//   }


//   // document.addEventListener("deviceready", function() {
//     // console.log("device is ready for the in app map!");
    
//     console.log("loading inapp map controller!");
//     var div = document.getElementById("map_canvas");
//     // Initialize the map view
//     var map = plugin.google.maps.Map.getMap();

//     // map.setVisible(false);
    
//     // Wait until the map is ready status.
//     map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

//   // });
  



//   function onMapReady() {
//     var button = document.getElementById("button");
//     button.addEventListener("click", onBtnClicked, false);
//   }


//   function onBtnClicked() {
//      map.showDialog();
//    }


// }
