angular
.module('sharedServices')
.factory("CardReader", [
  CardReader
	]);

function CardReader() {


  return {

    open: open

  }

  function open() {

    var cardIOResponseFields = [
      "card_type",
      "redacted_card_number",
      "card_number",
      "expiry_month",
      "expiry_year",
      "cvv",
      "zip"
    ];

    function onCardIOComplete(response) {
      try {
        for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
          var field = cardIOResponseFields[i];
        }  
      } catch(err) {
        console.error("caught error, most likely user canceling the card reader: " + err);
      }
      
    };

    function onCardIOCancel() {
      return
    };


    var onCardIOCheck = function (canScan) {        
        if (!canScan) {
          return
        } else  {
          CardIO.scan({
                "expiry": true,
                "cvv": true,
                "zip": true,
                "suppressManual": false,
                "suppressConfirm": false,
                "hideLogo": true
            },
            onCardIOComplete,
            onCardIOCancel
          );
        }
      };

    CardIO.canScan(onCardIOCheck);


  }










}









