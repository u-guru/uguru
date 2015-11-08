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
  var semesterArr = [];
  var semesterNames = [];
  var semesterDict = {};

  var overall = {
    averageGPA: averageGPA,
    semesterArr: semesterArr
  };


  return {

    overall: overall,
    addCourse: addCourse,
    semesterArr: semesterArr,
    getCumulativeGPA: getCumulativeGPA,
    getSemesterGPA: getSemesterGPA,
    syncCoursesFromCache: syncCoursesFromCache,
    getAllCourses: getAllCourses,
    init: init,
    recalcSemesterStats:recalcSemesterStats


  };

  function init(grades_arr) {

    for (var i = 0; i < grades_arr.length; i ++) {
      indexGrade = grades_arr[i];
      indexSemesterName = indexGrade.semester + ',' + indexGrade.year;

      // if semester doesn't exist
      if (semesterNames.indexOf(indexSemesterName) < 0) {
        semesterNames.push(indexSemesterName);
        semesterDict[indexSemesterName] = initSemesterObj(indexGrade);
        console.log('init deemster obj', semesterDict[indexSemesterName]);
      } else {
        indexGrade
        semesterDict[indexSemesterName]['grades'].push(indexGrade);
        recalcSemesterStats(indexSemesterName);
      }
    }
    semesterArr = semesterDictToArr();
    averageGPA = calcGPAFromSemesterArr(semesterArr);
    averageGPA.toFixed(1);

    overall.averageGPA = averageGPA;
    console.log(semesterArr);
    overall.semesterArr = semesterArr;
    return overall;
  }

  function semesterDictToArr() {
    var semesterKeyArr = Object.keys(semesterDict);
    var resultsArr = []
    for (var i = 0; i < semesterKeyArr.length; i ++) {
      indexSemesterKey = semesterKeyArr[i];
      indexSemesterValue = semesterDict[indexSemesterKey];
      resultsArr.push(indexSemesterValue);
    }
    return resultsArr;
  }

  function calcGPAFromSemesterArr(semesterArr) {
    var total_points = 0;
    var semester_units = 0;
    for (var i = 0; i < semesterArr.length; i ++) {
      total_points += semesterArr[i].total_points;
      var semester_grades = semesterArr[i].grades;
      for (var j = 0; j < semester_grades.length; j++) {
        var indexGrade = semester_grades[j];
        semester_units += parseInt(indexGrade.units);
      }
    }
    console.log('preGPA calc', total_points, semester_units);
    return total_points / semester_units;
  }

  function recalcSemesterStats(semester_name) {
    var semester = semesterDict[semester_name];

    var semester_grades = semester.grades;

    var total_points = 0;
    var max_units = 0;

    for (var i = 0; i < semester_grades.length; i++) {
      var indexGrade = semester_grades[i];
      total_points += indexGrade.units * reverseGradeLookup(indexGrade.grade);
      max_units += indexGrade.units;
    }
    console.log(total_points, max_units);

    semester.gpa = (total_points / max_units).toFixed(1);
    semester.avg_letter_grade = reverseGradeLookup(semester.gpa);
    semester.total_points = total_points

  }

  function initSemesterObj(gradeObj) {

    return {
          year: gradeObj.year,
          total_points: gradeObj.units * reverseGradeLookup(gradeObj.grade),
          grades: [gradeObj],
          gpa: reverseGradeLookup(gradeObj.grade).toFixed(1),
          avg_letter_grade:gradeObj.grade,
          semester: gradeObj.semester
    }

  }

  function gradeLookup(numerical_grade) {
    var letterGrades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
    var  numberGrades = [4, 3.7, 3.3, 3, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0];

    for (var i = 0; i < numberGrades.length; i ++) {
      var numberGradeIndex = numberGrades[i];

      if (numerical_grade >= numberGradeIndex) {
        return letterGrades[i];
      }
    }
    return 0;

  }

  function reverseGradeLookup(letter) {
    var lookupDict = {
      'A':4,'A+':4,'A-':3.7,
      'B+': 3.3,'B': 3,'B-':2.7,
      'C+': 2.3,'C': 2.0,'C-':1.7,
      'D+': 1.3,'D': 1,'D-':0.7,
      'F':0
    }
    return lookupDict[letter.toUpperCase()];
  }

  function getCumulativeGPA() {
    return averageGPA;
  }

  function syncCoursesFromCache(courses) {
    for (var i = 0; i < courses.length; i ++) {
      addCourse(courses[i]);
    }
  }

  function getAllCourses() {
    return addedCourses;
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




  function validateCourse(submittedCourse) {
    //validate courses here
  }

  function addCourse(submittedCourse) {

    //

    var course = submittedCourse;

    course.points = convertToPoints(course);

    addedCourses.push(course);
    totalGradePoints += course.points;
    totalUnits += course.units;

    overall.averageGPA = totalGradePoints / totalUnits;

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

      case "A+":
        return 4.0 * course.units;

      case "A-":
        return 3.7 * course.units;

      case "B+":
        return 3.3 * course.units;

      case "B":
        return 3.0 * course.units;

      case "B-":
        return 2.7 * course.units;

      case "C+":
        return 2.3 * course.units;

      case "C":
        return 2.0 * course.units;

      case "C-":
        return 1.7 * course.units;

      case "D+":
        return 1.3 * course.units;

      case "D":
        return 1.0 * course.units;

      case "D-":
        return 0.7 * course.units;

      case "F":
        return 0.0;

      default:
        console.log("Invalid Grade");
        return;

    }


  }


}








