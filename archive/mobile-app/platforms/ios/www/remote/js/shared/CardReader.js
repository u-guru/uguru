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
    console.log("opening card reader");

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
      console.log("card.io scan complete");
      try {
        for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
          var field = cardIOResponseFields[i];
          console.log(field + ": " + response[field]);
        }  
      } catch(err) {
        console.log("caught error, most likely user canceling the card reader: " + err);
      }
      
    };

    function onCardIOCancel() {
      console.log("card.io scan cancelled");
    };


    var onCardIOCheck = function (canScan) {
        console.log("card.io canScan? " + canScan);
        
        if (!canScan) {
          console.log("canScan doesn't work so therefore we should execute manual entry.");
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









