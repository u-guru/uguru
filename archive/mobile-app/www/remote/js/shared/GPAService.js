angular.module('sharedServices')
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
    switchGrade: switchGrade,
    recalcSemesterStats:recalcSemesterStats,
    defaultValue : defaultValue,
    getActualGrade: getActualGrade

  };

  function defaultValue()
  {
       overall = {
        averageGPA: 4.0,
        semesterArr: []
      };
      return overall;
  }
  function switchGrade(courses,isCutOff)
  {
    for (var i = 0 ; i< courses.length;++i)
    {
      if (isCutOff){
        courses[i].grade = gradeLookup(courses[i].actualGrade)
      }
      else{
        courses[i].grade = courses[i].grade.charAt(0)
      }

    }
    return courses

  }
  function init(userCourses) {
    console.log("User : ",userCourses)
    // console.log("isCutOffGrade : ",isCutOffGrade)

    semesterNames = []

    if (!userCourses) {
      userCourses = [];
    };
    if(!userCourses.length)
    {
      console.log("Default overall grades");
      return defaultValue();
    }
    console.log("semesterNames", semesterNames)
    console.log("userCourses", userCourses)
    for (var i = 0; i < userCourses.length; i ++) {

       var course = userCourses[i];
       var courseSemester = course.semester.toUpperCase()+','+course.year
      //Adding New semester
      if(semesterNames.indexOf(courseSemester) < 0 )
      {
          semesterNames.push(courseSemester);
          semesterDict[courseSemester] = initSemesterObj(course);
          console.log('Add new semester', semesterDict);
          // console.log( semesterDict[courseSemester]['courses'])
      }
      else
      { 
          console.log("Add Course",course)
          semesterDict[courseSemester]['courses'].push(course);
          semesterDict[courseSemester]['gpa'] = getSemesterGPA(semesterDict[courseSemester]['courses'])
          console.log( semesterDict[courseSemester]['gpa'])
          semesterDict[courseSemester]['total_points'] = getTotalUnits(semesterDict[courseSemester]['courses']) 
 
      }
    }
    semesterArr = semesterDictToArr();
    averageGPA = getOverallGPA(semesterArr);
    overall.averageGPA = averageGPA
    overall.semesterArr = semesterArr;
    console.log("OVER, ",overall)
    return overall;
  }

  function initSemesterObj(course) {
    return {
          year: course.year,
          total_points: course.units,
          courses: [course],
          gpa: parseFloat(reverseGradeLookup(course.grade).toFixed(1)),
          avg_letter_grade:course.grade,
          semester: course.semester
    }

  }
  function getTotalUnits(courses){
    var semesterUnits = 0;
    for (var i = 0 ; i < courses.length; ++i)
      semesterUnits += courses[i].units
    return semesterUnits
  }
  function getSemesterGPA(courses) {

      var semesterGrade = 0;
      var semesterUnits = 0;
      for (var i = 0 ; i < courses.length; ++i)
      {
        semesterUnits += courses[i].units
        semesterGrade += parseFloat(reverseGradeLookup(courses[i].grade).toFixed(1)) * courses[i].units
      }
    return semesterGrade/semesterUnits
  }
  function getOverallGPA(semesterArr){
    var totalSemester = semesterArr.length;
    var semester_total_gpa = 0;
    for (var i = 0;i <semesterArr.length ;++i)
        semester_total_gpa += semesterArr[i]['gpa']
    avgGPA = semester_total_gpa / totalSemester
    return avgGPA
  }
  function semesterDictToArr() {
    var semesterKeyArr = Object.keys(semesterDict);
    var resultsArr = []
    for (var i = 0; i < semesterKeyArr.length; i ++) {
      indexSemesterKey = semesterKeyArr[i];
      indexSemesterValue = semesterDict[indexSemesterKey];
      resultsArr.push(indexSemesterValue);
    }
    resultsArr.sort(compareValue)
    return resultsArr;
  }
  function compareValue(a,b){


      if (a.year == b.year)
      {
        var aValue = setPriority(a.semester);
        var bValue = setPriority(b.semester);

        return bValue - aValue
      }
      else
      {
        return b.year - a.year
      }

  }
  function setPriority(str)
  {
      switch (str.toLowerCase()) {
        case "fall":
            return 1
        case "summer":
            return 2
        case "spring":
            return 3
        case "winter":
            return 0
        default:
          console.error("ERROR Semester")
          return 
             break;
        }
  }
  function getActualGrade(grade){

    var isPostive = 0
    var gradePoint = 0

    console.log("index")
    if (grade.indexOf("+") > 0 && grade.indexOf("-") < 0)
      isPostive = 1
    else if(grade.indexOf("+") < 0 && grade.indexOf("-") > 0)
      isPostive = -1
    else 
      isPostive = 0
    gradeSyn = grade.charAt(0)
    switch (gradeSyn) {
          case 'A':
            gradePoint = 4
              break;
          case 'B':
            gradePoint = 3
              break;
          case 'C':
            gradePoint = 2
              break;
            case 'D':
            gradePoint = 1
                break;
            default:
              gradePoint = 0
                 break;
          }
    
        gradePoint += 0.3 * isPostive
        return gradePoint
  }
  function calcGPAFromSemesterArr(semesterArr) {
    console.log(semesterArr)
    var total_points = 0;
    var semester_units = 0;
    for (var i = 0; i < semesterArr.length; i ++) {
      total_points += semesterArr[i].total_points;
      var semester_grades = semesterArr[i].grades;
      for (var j = 0; j < semester_grades.length; j++) {
        var indexGrade = semester_grades[j];
        semester_units += parseFloat(indexGrade.units);
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

  // function getSemesterGPA(semester) {

  //   var semesterPoints = 0;
  //   var semesterUnits = 0;

  //   for (var i = 0; i < addedCourses.length; i++) {

  //     if (addedCourses[i].semester === semester) {

  //         semesterPoints += addedCourses[i].points;
  //         semesterUnits += addedCourses[i].units;
  //     }
  //   }
  //   if (semesterUnits !== 0) {
  //     return (semesterPoints / semesterUnits);
  //   } else {
  //     return 0.0;
  //   }

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








