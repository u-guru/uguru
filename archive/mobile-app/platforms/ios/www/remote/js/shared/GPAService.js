angular
.module('sharedServices')
.factory("GPAService", [
  GPAService
	]);

function GPAService() {


  var totalCredits = 0;

  var totalGradePoints = 0;


  return {

    calcGPA: calcGPA


  };


  function calcGPA(grade, credits) {



  }


  function convertToPoints(grade) {

    switch(grade) {

      case "A":
        return 4.0;

      case "B":
        return 3.0;

      case "C":
        return 2.0;

      case "D":
        return 1.0;

      case "F":
        return 0.0;

      default:
        console.log("Invalid Grade");
        return;

    }


  }


}








