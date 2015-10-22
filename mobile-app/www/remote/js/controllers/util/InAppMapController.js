angular.module('uguru.util.controllers')
.controller('InAppMapController', [
  '$scope',
  InAppMapController]);

function InAppMapController($scope) {

  var map;

  var div = document.getElementById("map_canvas");

  // Initialize the map view
  map = plugin.google.maps.Map.getMap(div);

  // Wait until the map is ready status.
  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);



  function onMapReady() {
    var button = document.getElementById("button");
    button.addEventListener("click", onBtnClicked, false);
  }


  function onBtnClicked() {
     map.showDialog();
   }


});
