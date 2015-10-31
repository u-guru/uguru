angular
.module('sharedServices')
.factory("GPAService", [
  GPAService
	]);

function GPAService() {

	var totalGradePoints = 0;
	var totalUnits = 0;
  
  var addedCourses = [];
  

  var averageGPA = 0;
  var semesters = [];

  var overall = {
    averageGPA: averageGPA,
    semesters: semesters

  };


  return {

    overall: overall,
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

    console.log("Successfully added course in GPAService!");
    console.log("totalGradePoints: " + totalGradePoints);
    console.log("totalUnits: " + totalUnits);

    overall.averageGPA = totalGradePoints / totalUnits;
    console.log("overall.averageGPA: " + overall.averageGPA);


    var semester = {
      name: course.semester
    };

    // check for only unique semesters
    var addSemester = true;
    for (var i = 0; i<overall.semesters.length; i++ ){

      if (overall.semesters[i].name === semester.name) {
        addSemester = false;
      }
    }
    if (addSemester) {
      console.log("adding semester: " + semester.name);
      overall.semesters.push(semester);  
    }
    
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








