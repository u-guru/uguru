angular
.module('sharedServices')
.factory("WindowService", [
  "$window",
  WindowService
    ]);

function WindowService($window) {


  var bodyRect;
  var windowHeight;
  var windowWidth;
  var desktopHeightLimit = 699;
  var desktopWidthLimit= 767;

  var initWindowObj = function() {
      bodyRect = document.querySelector('body').getBoundingClientRect();
      windowHeight = bodyRect.height;
      windowWidth = bodyRect.width;

      return { width:windowWidth, height:windowHeight }
  }

  // GABRIELLE TODO: Define these values

  return {
    initWindowObj: initWindowObj,
    isDesktopMode: isDesktopMode
  }

  function isDesktopMode(height, width) {
      height = height || windowHeight;
      width = width || windowWidth;
      return height > desktopHeightLimit && width > desktopWidthLimit;
  }

}








