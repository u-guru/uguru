
angular
.module('sharedServices')
.factory("ToastService", [
  ToastService
	]);

function ToastService() {


  return {

      show: show,
      hide: hide
  }

  //duration: 'short', 'long'    position: 'top', 'center', 'bottom'
  function show(message, duration, position) {

      window.plugins.toast.show(message, duration, position, success, error);

      function success() {
        console.log("toast success!");
      }

      function error(err) {
        console.log("toast error: " + err);
      }


  }

  // in case we need to force hide a toast
  function hide() {

      window.plugins.toast.hide();

  }


}