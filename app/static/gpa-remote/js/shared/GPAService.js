angular
.module('sharedServices')
.factory("GPAService", [
  GPAService
	]);

function GPAService() {

	var totalGradePoints = 0;
	var totalUnits = 0;
  
  var averageGPA = totalGradePoints / totalUnits;

  var addedCourses = [];


  return {

    calcGPA: calcGPA,
    addCourse: addCourse,
    getCumulativeGPA: getCumulativeGPA,
    getSemesterGPA: getSemesterGPA


  };

  function getCumulativeGPA() {
    return averageGPA;
  }

  function getSemesterGPA(semester) {

    var semesterPoints = 0;
    var semesterUnits = 0;

    for (var i = 0; i < addedCourses.length; i++) {

      if (addedCourses[i].semester === semester) {

          semesterPoints += addedCourses[i].points;
          semesterUnits += addedCourses[i].units;
      }
    }
    if (semesterUnits !== 0) {
      return (semesterPoints / semesterUnits);
    } else {
      return 0.0;
    }
    
  }




  function addCourse(submittedCourse) {
    // var course = {
    //  name: '',
    //  semester: '',
    //  units: 0,
    //  grade: 'A'
    // };
    
    var course = submittedCourse;

    course.points = convertToPoints(course);

    addedCourses.push(course);
    totalGradePoints += course.points;
    totalUnits += course.units;




  }


  function convertToPoints(course) {


    switch(course.grade) {

      case "A":
        return 4.0 * course.units;

      case "B":
        return 3.0 * course.units;

      case "C":
        return 2.0 * course.units;

      case "D":
        return 1.0 * course.units;

      case "F":
        return 0.0;

      default:
        console.log("Invalid Grade");
        return;

    }


  }


}








