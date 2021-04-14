angular
.module('sharedServices')
.factory("SocialSharing", [
  SocialSharing
	]);

function SocialSharing() {


  return {

    open: open

  }


  function open() {

    window.plugins.socialsharing.share("Nick is so cool!", "The subject line!", null, null);
      
  }





}









