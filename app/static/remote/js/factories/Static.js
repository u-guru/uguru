angular.module('uguru.static', [])

.factory('StaticDataService', ['$state', '$localstorage', 'University', 'Major', 'Course',
    function ($state, $localstorage, University, Major, Course) {


    var getStaticData = function(user) {


        University.get().then(
            function(universities) {

                universities = JSON.parse(universities);

                $localstorage.setObject('universities', universities);
            },
            function() {
                console.error('Universities NOT successfully loaded');
            }
        );

        if (user.university_id) {

            University.getMajors(user.university_id).then(
                function(new_majors) {
                    majors = JSON.parse(new_majors);
                    user.university.majors = majors;
                },
                function(error) {
                    console.error(error);
                }
            );


        } else {

            Major.get().then(
                function(majors) {
                    $localstorage.setObject('majors', JSON.parse(majors)["majors"]);
                },
                function() {
                    console.error('Majors NOT successfully loaded');
                }
            );

        }

        if (user.university_id) {

            //get courses
            University.getCourses(user.university_id).then(
                function(courses) {

                    var courses = JSON.parse(courses);
                    user.university.courses = courses;
                },
                function(error) {
                    console.error('Courses NOT successfully loaded');
                }
            );


        } else {

            Course.get().then(
                function(courses) {
                    $localstorage.setObject('courses', JSON.parse(courses)["courses"]);
                },
                function() {
                    console.error('Courses NOT successfully loaded');
                }
            );

        }

        // if android && not user.university_id, start computing the algorithm
        // based on their coordinates

        //if university_id get all majors for that particular university

        //get all courses for that university
    };

    return {

        getStaticData : getStaticData

    };

}]);