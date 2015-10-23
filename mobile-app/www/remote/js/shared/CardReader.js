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

    var onCardIOComplete = function(response) {
      console.log("card.io scan complete");
      for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
        var field = cardIOResponseFields[i];
        console.log(field + ": " + response[field]);
      }
    };

    var onCardIOCancel = function() {
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
                "hideLogo": false
            },
            onCardIOComplete,
            onCardIOCancel
          );
        }
      };

    CardIO.canScan(onCardIOCheck);

  }










}









