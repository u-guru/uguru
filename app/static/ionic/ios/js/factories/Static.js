angular.module('uguru.static', [])
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
.factory('StaticDataService', ['$state', '$localstorage', 'University', 'Major', 'Course',
    function ($state, $localstorage, University, Major, Course) {
        
    console.log('Getting static data from the ' + $state.current.name + ' state...');

    var getStaticData = function(user) {

        
        University.get().then(
            function(universities) {
                
                universities = JSON.parse(universities);
                
                $localstorage.setObject('universities', universities);
                console.log(universities.length + ' universities successfully loaded');
            },
            function() {
                console.log('Universities NOT successfully loaded');
            }
        );

        if (user.university_id) {

            University.getMajors(user.university_id).then(
                function(new_majors) {

                  console.log(new_majors);


                    majors = JSON.parse(new_majors);
                    console.log(majors.length + ' majors uploaded from ' + user.university.title);

                    user.university.majors = majors;
                },
                function(error) {
                    console.log('Majors NOT successfully loaded');
                    console.log(error);
                }
            );


        } else {

            Major.get().then(
                function(majors) {
                    console.log('Majors successfully loaded');
                    $localstorage.setObject('majors', JSON.parse(majors)["majors"]);
                },
                function() {
                    console.log('Majors NOT successfully loaded');
                }
            );

        }

        if (user.university_id) {

            //get courses
            University.getCourses(user.university_id).then(
                function(courses) {

                    var courses = JSON.parse(courses);
                    console.log(courses.length + ' courses uploaded from ' + user.university.title);
                            
                    user.university.courses = courses;
                },
                function(error) {
                    console.log('Courses NOT successfully loaded');
                    console.log(error);
                }
            );

        
        } else {

            Course.get().then(
                function(courses) {
                    console.log('Courses successfully loaded');
                    $localstorage.setObject('courses', JSON.parse(courses)["courses"]);
                },
                function() {
                    console.log('Courses NOT successfully loaded');
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