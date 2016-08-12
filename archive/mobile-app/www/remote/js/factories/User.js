angular.module('uguru.user', [])
.factory('User', ['$localstorage', 'Restangular', '$state', '$timeout', '$ionicModal', '$ionicHistory',
    'RootService', '$ionicSideMenuDelegate', 'Category', 'RankingService', 'LoadingService', 'RequestService',
    function($localstorage, Restangular, $state, $timeout, $ionicModal, $ionicHistory, RootService,
        $ionicSideMenuDelegate, Category, RankingService, LoadingService, RequestService) {
    var User;

    var defineProperty = function(obj, name, value) {
        var config = {
            writeable: true,
            enumberable: true,
            configurable: true,
            value: value
        };
        Object.defineProperty(obj, name, config);
    }

    var calcAverage = function(ratings_arr, is_guru) {
                if (!ratings_arr) {
                    return 0;
                }

                if (ratings_arr.length === 0)  {
                    return 0;
                }
                result = 0;
                for (var i = 0; i < ratings_arr.length; i ++) {
                    if (is_guru) {
                        result += ratings_arr[i].guru_rating;
                    } else {
                        result += ratings_arr[i].student_rating;
                    }
                }
                result = (result / ratings_arr.length) || 0
                result = {
                    'float':result || 0,
                    'int': parseInt(result || 0),
                    'half': Math.abs(parseInt(result) - result) === 0.5
                }
                return result;
    }

    var parseRFC822Date = function(rfc_date) {
        return new Date(Date.parse(rfc_date))
    }

    var jsDateObjToMessageFormat = function(date) {
          var date = parseRFC822Date(date);
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
          return strTime;
    }

    var formatProfileUrl = function(profile_url) {
        if (profile_url === '/static/img/default-photo.jpg') {
            return img_base + BASE + "img/avatar.svg"
        } else if (!profile_url) {
            return "https://uguru.me/static/remote/img/avatar.svg";
        }
        return profile_url
    }

    var getAndProcessAcademicShop = function(guru_shops) {
        academic_shop = {};
        for (var i = 0; i < guru_shops.length; i++) {
            var indexShop = guru_shops[i];
            if (indexShop.category.name === 'Academic') {

                academic_shop = indexShop;

                for (var j = 0; j < academic_shop.portfolio_items.length; j ++) {
                    indexPortfolioItem = academic_shop.portfolio_items[j];
                    academic_shop.portfolio_items[j].avg_rating = parseFloat(academic_shop.portfolio_items[j].avg_rating).toFixed(1);
                    if (academic_shop.portfolio_items[j].hourly_price) {
                        academic_shop.portfolio_items[j].hourly_price = parseInt(academic_shop.portfolio_items[j].hourly_price);
                    }
                    if (indexPortfolioItem.avg_rating) {
                        academic_shop.portfolio_items[j].rounded_avg_rating = parseInt(indexPortfolioItem.avg_rating);
                        if (Math.abs(academic_shop.portfolio_items[j].rounded_avg_rating - indexPortfolioItem.avg_rating) >= .25) {
                            academic_shop.portfolio_items[j].half_stars = true;
                        } else {
                            academic_shop.portfolio_items[j].half_stars = Math.abs(parseInt(indexPortfolioItem.avg_rating) - indexPortfolioItem.avg_rating) === 0.5;
                        }
                    }
                }
                return academic_shop;
            }
        }
        return academic_shop;
    }

    var processReferrals = function(referrals) {
        for (var i = 0; i < referrals.length; i++) {
            var referralIndex = referrals[i];
            if (referralIndex.receiver) {
                referralIndex.receiver.name = referralIndex.receiver.name.split(' ')[0];
                referralIndex.receiver.name[0] = referralIndex.receiver.name[0].toUpperCase;
            }
        }
        return referrals
    }

    var parseProfileResources = function(external_profiles) {
            var resultDict = {};
            for (var i = 0; i < external_profiles.length; i++) {
                var indexProfile = external_profiles[i];
                if (indexProfile.site_url && indexProfile.title.toLowerCase().indexOf('facebook') > -1) {
                    resultDict.facebook = indexProfile.site_url.replace('facebook.com/', '');
                }
                if (indexProfile.site_url && indexProfile.title.toLowerCase().toLowerCase().indexOf('twitter') > -1) {
                    resultDict.twitter = indexProfile.site_url;
                }
                if (indexProfile.site_url && indexProfile.title.toLowerCase().toLowerCase().indexOf('instagram') > -1) {
                    resultDict.instagram = indexProfile.site_url;
                }
                if (indexProfile.site_url && indexProfile.title.toLowerCase().indexOf('linkedin') > -1) {
                    resultDict.linkedin = indexProfile.site_url;
                }
            }

            if (!resultDict.facebook) {
                resultDict.facebook = 'your-fb-url';
            }
            if (!resultDict.instagram) {
                resultDict.instagram = 'your-insta-url';
            }
            if (!resultDict.twitter) {
                resultDict.twitter = 'your-twitter-url';
            }
            if (!resultDict.linkedin) {
                resultDict.linkedin = 'your-linkedin-url';
            }

            return resultDict;
        }

    var parseRelationships = function(relationships) {
        for (var i = 0; i < relationships.length; i++) {
            var indexRelationship = relationships[i];

            // parse student name
            if (indexRelationship.student.name) {
                var nameSplitArr = indexRelationship.student.name.split(' ');
                var firstNameStudent = nameSplitArr[0];
                var lastInitialStudent = nameSplitArr[nameSplitArr.length - 1][0].toUpperCase() + '.';
                indexRelationship.student.name = firstNameStudent + ' ' + lastInitialStudent;
            } else if (!indexRelationship.student.name) {
                indexRelationship.student.name = '';
            }
            indexRelationship.student.profile_url = formatProfileUrl(indexRelationship.student.profile_url)



            if (indexRelationship.guru.name) {
                var nameSplitArr = indexRelationship.guru.name.split(' ');
                var firstNameGuru = nameSplitArr[0];
                var lastInitialGuru = nameSplitArr[nameSplitArr.length - 1][0].toUpperCase() + '.';
                indexRelationship.guru.name = firstNameGuru + ' ' + lastInitialGuru;
            } else if (!indexRelationship.guru.name) {
                indexRelationship.guru.name = '';
            }
            indexRelationship.guru.profile_url = formatProfileUrl(indexRelationship.guru.profile_url)


            if (indexRelationship.messages && indexRelationship.messages.length) {
                for (var j = 0; j < indexRelationship.messages.length; j++) {
                    var indexMessage = indexRelationship.messages[j];
                    indexMessage.time_created = jsDateObjToMessageFormat(indexMessage.time_created);
                    if (indexMessage.sender.id === indexRelationship.student.id) {
                        indexMessage.sender.name = indexRelationship.student.name;
                        indexMessage.sender.profile_url = formatProfileUrl(indexRelationship.student.profile_url);
                    } else {
                        indexMessage.sender.name = indexRelationship.guru.name;
                        indexMessage.sender.profile_url = formatProfileUrl(indexRelationship.guru.profile_url);
                    }

                }
            }
            // indexRelationship.guru.name = firstName + ' ' + lastInitial;

        }
        return relationships;
    }

    var calcProfileCompleteness = function(user) {
        var default_url = "https://graph.facebook.com/10152573868267292/picture?width=100&height=100";
        var base = 60; //40%
        var num_items = 8;
        var default_item_weight = 10;
        // var mini_item_weight = 2;
        var max_points = 170; //base (60) + (9 * 10) + (3 * 10)

        if (!user.is_a_guru) {
            return 0;
        }

        if (user.profile_url && (user.profile_url !== default_url)) {
            base += (2 * default_item_weight);
        }
        if (user.university_id && user.university.title) {
            base += default_item_weight;
        }
        if (user.majors && user.majors.length) {
            base += default_item_weight
        }
        if (user.guru_courses && user.guru_courses.length) {
            base += (2 * default_item_weight)
        }
        if (user.skype_friendly || user.facetime_friendly || user.hangouts_friendly || user.messenger_friendly || user.phone_friendly || user.text_friendly || user.email_friendly) {
            base += default_item_weight;
        }
        if (user.guru_languages && user.guru_languages.length) {
            base += default_item_weight;
        }
        if (user.guru_experiences && user.guru_experiences.length) {
            base += (2 * default_item_weight)
        }
        if (user.guru_introduction && user.guru_introduction.length) {
            base += default_item_weight;
        }
        var percentage = parseInt((base  / (max_points * 1.0)) * 100);

        return percentage;
    }

    var calcCredibilityCompleteness = function(user) {
        var base = 0; //40%
        var num_items = 5;
        var default_item_weight = 20;
        var max_points = 100;

        if (user.fb_id) {
            base += default_item_weight;
        }
        if (user.transcript_file && user.transcript_file.url && user.transcript_file.url.length) {
            base += default_item_weight;
        }
        if (user.tutoring_platforms_description) {
            base += default_item_weight;
        }
        if (user.school_email_confirmed) {
            base += default_item_weight;
        }
        if (user.phone_number_confirmed) {
            base += default_item_weight;
        }
        var percentage = parseInt((base  / (max_points * 1.0)) * 100);
        return percentage;
    }

    var calcGuruCurrentRanking = function(user) {
        var base = 25; //40%
        var num_items = 5;
        var max_points = 100;
        var guru_ranking;


        if (user.default_transfer_card) {
            base += 6
        }
        if (user.current_credibility_percent) {
            base += ((user.current_credibility_percent / 100.0) * 16);
        }
        if (user.current_profile_percent) {
            base += ((user.current_profile_percent / 100.0) * 22);
        }
        if (user.push_notifications || user.text_notifications) {
            base += 20;
        }
        if (user.deposit_confirmed) {
            base += 11;
        }


        return base - 1;
    }



    var processStudentRequestCalendar = function(index_request) {
        if (index_request.student_calendar && index_request.student_calendar.length > 0 &&
            index_request.student_calendar[0].calendar_events && index_request.student_calendar[0].calendar_events.length > 0) {

            var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            js_start_date = new Date(index_request.student_calendar[0].calendar_events[0].start_time);
            js_end_time = new Date(index_request.student_calendar[0].calendar_events[0].end_time);

            var student_availability = index_request.student_calendar[0].calendar_events[0];
            student_availability.formatted = {
                date: js_start_date.getUTCDate(),
                day: weekdays[js_start_date.getUTCDay()],
                month: months[js_start_date.getUTCMonth()],
                start_time: {hours: js_start_date.getUTCHours(), minutes: js_start_date.getUTCMinutes()},
                end_time: {hours: js_end_time.getUTCHours(), minutes: js_end_time.getUTCMinutes()},
            }

            student_availability.formatted.start_time_formatted = RootService.time.formatHoursAndMinutes(student_availability.formatted.start_time, false);
            student_availability.formatted.end_time_formatted = RootService.time.formatHoursAndMinutes(student_availability.formatted.end_time, true);
            student_availability.formatted.time_length = Math.round((index_request.time_estimate / 60)* 2)/2;

        }
        return index_request;
    }

    var processResults = function(user) {

        request_status_arr = ['PROCESSING_GURUS', 'INCOMING GURU', 'SESSION STARTING SOON', 'YOU REJECTED ALL GURUS',
        'CANCELED','YOUR GURU CANCELED', 'NO GURUS AVAIL', 'YOUR GURU CANCELED', 'YOU CANCELED',
        'COMPLETED', 'COMPLETED', 'COMPLETED', 'REFUNDED', 'GURU NO SHOW', 'YOU DIDNT SHOW', 'QUESTION ACCEPTED',
        'QUESTION ANSWERED', 'COMPLETED', null, null, null, 'COMPLETED']

        user.active_requests = [];
        if (!user.skills) {
            user.skills = [];
        }

        if (!user.professions) {
            user.professions = [];
        }

        user.pending_guru_ratings = [];
        user.pending_student_ratings = [];
        user.incoming_requests = [];
        user.active_tasks = [];
        user.previous_requests = [];
        user.pending_proposals = [];
        user.previous_proposals = [];
        user.active_student_sessions = [];
        user.previous_student_sessions = [];
        user.payment_cards = [];
        user.transfer_cards = [];
        user.course_guru_dict = {};
        user.gurus = [];
        // user.uber_friendly = false;
        // user.summer_15 = false;

        var user_cards = user.cards || [];
        for (var i = 0; i < user_cards.length; i++) {
            var card = user_cards[i];
            if (card.card_type) {
                card.card_type = card.card_type.toLowerCase();
            }
            //payment cards processing
            if (card.is_default_payment) {
                user.default_payment_card = card;
            }
            if (card.is_payment_card) {
                user.payment_cards.push(card);
            }
            //transfer cards processing
            if (card.is_transfer_card || card.is_bank_account) {
                user.transfer_cards.push(card);
            }
            if (card.is_default_transfer) {
                user.default_transfer_card = card;
            }
        }

        var user_requests = user.requests;
        if (user_requests && user_requests.length > 0) {
            for (var i = 0; i < user_requests.length; i ++) {
              var index_request = user_requests[i];
                if (index_request.status === 0) {
                    index_request.formatted_time = RootService.time.since(new Date(index_request.time_created));
                    index_request = processStudentRequestCalendar(index_request);
                    user.active_requests.push(index_request);
                }
                else if (index_request.status === 1) {
                    if (index_request.guru && index_request.guru.guru_ratings && index_request.guru.guru_ratings.length > 0) {
                        index_request.guru.guru_avg_rating = parseInt(calcAverage(index_request.guru.guru_ratings));
                    } else if (index_request.guru) {
                        index_request.guru.guru_avg_rating = 0;
                    }
                    index_request = processStudentRequestCalendar(index_request);
                    user.incoming_requests.push(index_request);
                }

                else {

                    index_request.current_status = request_status_arr[index_request.status];
                    user.previous_requests.push(index_request);
                }
            }
        }
        var student_sessions = user.student_sessions;
        if (student_sessions && student_sessions.length > 0) {
            for (var i = 0; i < student_sessions.length; i ++) {
              var index_session = student_sessions[i];
              if (index_session.status === 0 || index_session.status === 1 || index_session.status === 2) {
                index_session.guru.guru_avg_rating = calcAverage(index_session.guru.guru_ratings, true);
                user.active_student_sessions.push(index_session);
              } else if (index_session.status === 6 || index_session.status === 7 || index_session.status === 8 ) {
                user.previous_student_sessions.push(index_session);
              }
            }
        }

        var guru_relationships = user.guru_relationships;
        user.gurus = user.guru_relationships;
        if (guru_relationships && guru_relationships.length > 0) {
            for (var i = 0; i < guru_relationships.length; i ++) {
                var index_relationship = guru_relationships[i];
                var session_course = index_relationship.sessions[0].course
                if (user.course_guru_dict[session_course.short_name]) {
                    user.course_guru_dict[session_course.short_name].push(index_relationship);
                } else {
                    user.course_guru_dict[session_course.short_name] = [index_relationship];
                }
            }
        }

        var student_ratings = user.student_ratings;
        if (student_ratings && student_ratings.length > 0) {
            for (var i = 0; i < student_ratings.length; i ++) {
              var index_rating = student_ratings[i];
              if (index_rating.guru_rating === 0 && user.id === index_rating.student_id) {
                if (index_rating.session && index_rating.session.transaction) {
                    index_rating.session.transaction.student_amount = parseFloat(index_rating.session.transaction.student_amount).toFixed(2);
                    index_rating.session.transaction.guru_amount = parseFloat(index_rating.session.transaction.guru_amount).toFixed(2);
                }

                user.pending_guru_ratings.push(index_rating);
              }
            }
        }
        user.student_avg_rating = calcAverage(student_ratings, false);

        var student_transactions = user.student_transactions || [];
        MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        for (var i = 0; i < student_transactions.length; i ++) {
            var utc = Date.parse(student_transactions[0].time_created);
            var date = new Date(utc);
            user.student_transactions[i].time = {date: date.getDate(), month: MONTHS[date.getMonth()], year:date.getFullYear(), hour:date.getUTCHours(), minutes:date.getUTCMinutes()}
            if (user.student_transactions[i].time.hour > 12) {
                user.student_transactions[i].time.hour = user.student_transactions[i].time.hour - 12;
                user.student_transactions[i].time.amPM = 'PM';
            } else {
                user.student_transactions[i].time.amPM = 'AM';
            }
            user.student_transactions[i].student_amount = parseFloat(user.student_transactions[i].student_amount).toFixed(2);
            user.student_transactions[i].guru_amount = parseFloat(user.student_transactions[i].guru_amount).toFixed(2);
            if (user.student_transactions[i].student_amount - parseInt(user.student_transactions[i].student_amount) === 0) {
                user.student_transactions[i].student_amount = parseInt(user.student_transactions[i].student_amount);
            }

            user.student_transactions[i].student_rate = 5;
        }

        var guru_transactions = user.guru_transactions || [];
        for (var i = 0; i < guru_transactions.length; i ++) {
            var utc = Date.parse(guru_transactions[i].time_created);
            var date = new Date(utc);
            user.guru_transactions[i].time = {date: date.getDate(), month: MONTHS[date.getMonth()], year:date.getFullYear(), hour:date.getUTCHours(), minutes:date.getUTCMinutes()}
            user.guru_transactions[i].student_amount = parseFloat(user.guru_transactions[i].student_amount).toFixed(2);
            user.guru_transactions[i].guru_amount = (parseFloat(user.guru_transactions[i].guru_amount) / 100 ).toFixed(2);
            if (user.guru_transactions[i].guru_amount == parseInt(user.guru_transactions[i].guru_amount)) {
                user.guru_transactions[i].guru_amount = parseInt(user.guru_transactions[i].guru_amount);
            }
            if (user.student_transactions[i].guru_amount - parseInt(user.student_transactions[i].guru_amount) === 0) {
                user.student_transactions[i].guru_amount = parseInt(user.student_transactions[i].guru_amount);
            }
            user.guru_transactions[i].guru_rate = 5;
        }


        var transfer_transactions = user.transfer_transactions || [];
        for (var i = 0; i < transfer_transactions.length; i ++) {
            var utc = Date.parse(transfer_transactions[0].time_created);
            var date = new Date(utc);
            user.transfer_transactions[i].time = {date: date.getDate(), month: MONTHS[date.getMonth()], year:date.getFullYear(), hour:date.getUTCHours(), minutes:date.getUTCMinutes()}
            user.transfer_transactions[i].student_amount = parseFloat(user.transfer_transactions[i].student_amount).toFixed(2);
            user.transfer_transactions[i].guru_amount = parseFloat(user.transfer_transactions[i].guru_amount).toFixed(2);
        }

        // user.guru_mode = true;
        if (user.is_a_guru) {
            if (!user.balance) {
                user.balance = 0;
            } else {
                user.balance = parseInt(user.balance);
            }
            if (!user.total_earned) {
                user.total_earned = 0;
            }
            user.active_proposals = [];
            user.pending_proposals = [];
            user.active_questions = [];
            user.active_guru_sessions = [];
            user.previous_guru_proposals = [];
            user.pending_student_ratings = [];
            user.previous_guru_sessions = [];

            var guru_ratings = user.guru_ratings;
            user.guru_rating = calcAverage(guru_ratings, true);
            user.guru_avg_rating = user.guru_rating.float || 0;

            if (!user.guru_avg_rating) {
                user.guru_avg_rating = 0;
            }
            if (guru_ratings && guru_ratings.length > 0) {
                for (var i = 0; i < guru_ratings.length; i ++) {
                  var index_rating = guru_ratings[i];
                  if (index_rating.student_rating === 0 && user.id === index_rating.guru_id) {
                    if (index_rating.session && index_rating.session.transaction) {
                        index_rating.session.transaction.student_amount = parseFloat(index_rating.session.transaction.student_amount).toFixed(2);
                        index_rating.session.transaction.guru_amount = parseFloat(index_rating.session.transaction.guru_amount).toFixed(2);
                        user.pending_student_ratings.push(index_rating);
                    }
                  }
                }
            }

            var guru_grade_arr = user.grade_dict;
            var num_gurus_university = user.university.num_gurus;
            for (var i =0; i < guru_grade_arr.length; i ++) {
                var letter_grade = guru_grade_arr[i][0];
                var number_grade = guru_grade_arr[i][1];
                var guru_rank_percentile = (user.official_guru_rank / num_gurus_university) * 100;

                if (guru_rank_percentile >= number_grade) {
                    user.official_guru_grade = letter_grade;
                    break;
                }
            }

            var guru_sessions = user.guru_sessions;
            if (guru_sessions && guru_sessions.length > 0) {
                for (var i = 0; i < guru_sessions.length; i ++) {
                  var index_session = guru_sessions[i];
                  if (index_session.status === 0 || index_session.status === 1 || index_session.status === 2) {
                    if (index_session.student && index_session.student.student_ratings && index_session.student.student_ratings.length > 0) {
                        index_session.student.student_avg_rating = calcAverage(index_session.student.student_ratings, false);
                    }
                    user.active_guru_sessions.push(index_session);
                  } else if (index_session.status === 6 || index_session.status === 7 || index_session.status === 8 ) {
                    user.previous_guru_sessions.push(index_session);
                  }
                }
            }

            var user_proposals = user.guru_proposals;
            if (user.guru_proposals && user.guru_proposals.length > 0) {
                for (var i = 0; i < user_proposals.length; i ++) {
                    var index_proposal = user_proposals[i];

                     if (index_proposal.status === 4 || index_proposal.status === 5 ) {
                        index_proposal.status_string = 'STUDENT CANCELED';
                        user.previous_proposals.push(index_proposal);
                    }

                    else if (index_proposal.status === 0 && index_proposal.request.status === 0) {
                        index_proposal.formatted_time = RootService.time.since(new Date(index_proposal.time_created));

                        index_proposal.request = processStudentRequestCalendar(index_proposal.request)
                        user.active_proposals.push(index_proposal);
                    } else
                    if (index_proposal.status === 2) {
                        user.pending_proposals.push(index_proposal);
                    }
                }

                // //guru has incoming proposal
                // if (user.active_proposals && user.active_proposals.length > 0) {

                //     $timeout(function() {
                //       var first_active_proposal = user.active_proposals[0];

                //       var paramPayload = {
                //         requestObj:JSON.stringify(first_active_proposal.request),
                //         proposalObj: JSON.stringify(first_active_proposal)
                //       }

                //         if ($state.current.name === 'root.guru.home') {
                //             $state.go('^.student-available', paramPayload);
                //         }
                //     }, 500)

                // }

            }

        }
        return user;
    }

    var assignPropertiesToRootScope = function($scope, processed_user) {
        var user = processed_user;

        if (!$scope.user) {
            $scope.user === initUser();
        }

        $scope.user.updateAttr = User.updateAttrUser;
        $scope.user.createObj = User.createObj;
        $scope.user.updateObj = User.updateObj;

        $scope.user.id = user.id;
        $scope.user.name = user.name;
        $scope.user.first_name = user.name.split(' ')[0];
        var user_name_split = user.name.split(' ');
        $scope.user.profile_name = user.name.split(' ')[0] + ' ' + user_name_split[user_name_split.length - 1][0].toUpperCase() + '.';
        $scope.user.profile_url = user.profile_url;
        if ($scope.user.profile_url === 'https://graph.facebook.com/10152573868267292/picture?width=100&height=100') {
            $scope.user.profile_url = img_base + BASE + "img/avatar.svg";
        }
        $scope.user.is_a_guru = user.is_a_guru;
        $scope.user.guru_mode = user.guru_mode;
        $scope.user.gender = user.gender;
        $scope.user.customer_id = user.customer_id;
        $scope.user.recipient_id = user.recipient_id;
        $scope.user.auth_token = user.auth_token;
        $scope.user.fb_id = user.fb_id;
        $scope.user.files = user.files;
        $scope.user.default_card = user.default_card;
        $scope.user.password = user.password;
        $scope.user.guru_introduction = user.guru_introduction;
        $scope.user.tos_version = user.tos_version;
        $scope.user.university_id = user.university_id;
        $scope.user.university = user.university;
        $scope.user.recent_latitude = user.recent_latitude;
        $scope.user.recent_longitude = user.recent_longitude;
        $scope.user.location_services_enabled = user.location_services_enabled;

        $scope.user.majors = user.departments;
        $scope.user.major = user.major || 'mathematics';
        $scope.user.year = user.year;

        $scope.user.guru_categories = user.guru_categories;
        $scope.user.guru_subcategories = user.guru_subcategories;

        if (Category.categories && Category.categories.length) {
            Category.mapActiveToSubcategories(Category.categories, $scope.user);
        }

        $scope.user.transcript_verified_by_admin = user.transcript_verified_by_admin;
        $scope.user.guru_courses = user.guru_courses;
        $scope.user.student_courses = user.student_courses;
        $scope.user.student_sessions = user.student_sessions;
        $scope.user.guru_sessions = user.guru_sessions;
        $scope.user.push_notifications = user.push_notifications;
        $scope.user.push_notifications_enabled = user.push_notifications_enabled;
        $scope.user.guru_score = user.guru_score;
        $scope.user.last_position = user.last_position;
        $scope.user.requests = user.requests;
        $scope.user.sessions = user.sessions;
        $scope.user.guru_proposals = user.guru_proposals;
        $scope.user.cards = user.cards;
        $scope.user.guru_committed = user.guru_committed;
        $scope.user.student_transactions = user.student_transactions;
        $scope.user.guru_transactions = user.guru_transactions;
        $scope.user.transfer_transactions = user.transfer_transactions;
        $scope.user.transfer_cards = user.transfer_cards;
        $scope.user.payment_cards = user.payment_cards;
        $scope.user.default_payment_card = user.default_payment_card;
        $scope.user.default_transfer_card = user.default_transfer_card;
        $scope.user.course_guru_dict = user.course_guru_dict;
        $scope.user.gurus = user.gurus;
        $scope.user.guru_relationships = parseRelationships(user.guru_relationships);
        $scope.user.student_relationships = parseRelationships(user.student_relationships);
        $scope.user.referred_by = user.referred_by;
        $scope.user.referral_code = user.referral_code;
        $scope.user.profile_code = user.profile_code;
        $scope.user.guru_discoverability = user.guru_discoverability;
        $scope.user.current_device = user.current_device;
        $scope.user.devices = user.devices;
        $scope.user.current_hourly = user.current_hourly;
        $scope.user.previous_proposals = user.previous_proposals;
        $scope.user.previous_guru_proposals = user.previous_guru_proposals;
        $scope.user.universities = user.universities;
        $scope.user.high_school = user.high_school;
        $scope.user.is_admin = user.is_admin;
        // if (!$scope.user.is_admin) {
        //     var AdminService = {};
        // }


        $scope.user.active_questions = user.active_questions;
        $scope.user.active_tasks = user.active_tasks;
        $scope.user.guru_skills = user.guru_skills;
        $scope.user.transcript_file = user.transcript_file;
        $scope.user.transcript_verified_by_admin = user.transcript_verified_by_admin;
        $scope.user.tutoring_platforms_description = user.tutoring_platforms_description;
        $scope.user.guru_deposit = user.guru_deposit;

        $scope.user.email_friendly = user.email_friendly;
        $scope.user.facetime_friendly = user.facetime_friendly;
        $scope.user.guru_latest_time = user.guru_latest_time;
        $scope.user.hangouts_friendly = user.hangouts_friendly;
        $scope.user.messenger_friendly = user.messenger_friendly;
        $scope.user.external_profiles = user.external_profiles;
        $scope.user.external_profiles_dict = parseProfileResources(user.external_profiles)

        $scope.user.person_friendly = user.person_friendly;
        $scope.user.phone_friendly = user.phone_friendly;
        $scope.user.person_friendly = user.person_friendly;
        $scope.user.skype_friendly = user.skype_friendly;
        $scope.user.hs_student = user.hs_student;
        $scope.user.hs_files = user.hs_files;
        $scope.user.text_friendly = user.text_friendly;
        $scope.user.guru_experiences = user.guru_experiences;
        $scope.user.guru_shops = user.guru_shops;
        if (user.guru_shops && user.guru_shops.length) {
            $scope.user.academic_shop = getAndProcessAcademicShop(user.guru_shops);
            if (!$scope.user.academic_shop.title) {
                $scope.user.academic_shop.title = user.first_name + "’s Academic Shop"
            }
        }

        $scope.user.guru_currencies = user.guru_currencies;
        $scope.user.guru_languages = user.guru_languages;
        $scope.user.referrals = processReferrals(user.referrals);
        $scope.user.first_degree_referrals = user.first_degree_referrals;
        $scope.user.second_degree_referrals = user.second_degree_referrals;
        $scope.user.referral_limit = user.referral_limit;

        $scope.user.text_notifications = user.text_notifications;
        $scope.user.email_notifications = user.email_notifications;
        $scope.user.email = user.email;
        $scope.user.school_email = user.school_email;
        $scope.user.school_email_confirmed = user.school_email_confirmed;
        $scope.user.push_notifications = user.push_notifications;
        $scope.user.phone_number = user.phone_number;
        $scope.user.phone_number_token = (user.phone_number_token && true); // dont let user get access to

        $scope.user.phone_number_confirmed = user.phone_number_confirmed;
        $scope.user.active_proposals = user.active_proposals;
        $scope.user.impact_events = user.impact_events;
        if (user.pending_proposals && user.pending_proposals.length > 0) {
            $scope.user.pending_proposals = user.pending_proposals.reverse();
        } else {
            $scope.user.pending_proposals = user.pending_proposals;
        }
        $scope.user.active_guru_sessions = user.active_guru_sessions;
        $scope.user.pending_student_ratings = user.pending_student_ratings;
        $scope.user.previous_guru_sessions = user.previous_guru_sessions;
        $scope.user.active_requests = user.active_requests.reverse();
        $scope.user.pending_guru_ratings = user.pending_guru_ratings;
        $scope.user.pending_student_ratings = user.pending_student_ratings;
        $scope.user.incoming_requests = user.incoming_requests;
        $scope.user.previous_requests = user.previous_requests.reverse();
        $scope.user.active_student_sessions = user.active_student_sessions;
        $scope.user.previous_student_sessions = user.previous_student_sessions;
        $scope.user.balance = user.balance;
        $scope.user.total_earned = Math.round(user.total_earned);
        $scope.user.estimated_guru_rank = user.estimated_guru_rank;
        $scope.user.official_guru_rank = user.official_guru_rank;
        $scope.user.estimated_guru_score = user.estimated_guru_score;
        $scope.user.official_guru_score = user.official_guru_score;
        $scope.user.estimated_guru_rank_last_updated = user.estimated_guru_rank_last_updated;
        $scope.user.official_guru_rank_last_updated = user.official_guru_rank_last_updated;
        if (user.guru_avg_rating) {
            $scope.user.guru_avg_rating = Math.round(user.guru_avg_rating.float * 10) / 10;
        } else {
            $scope.user.guru_avg_rating = 0;
        }
        $scope.user.guru_rating = user.guru_rating
        $scope.user.student_avg_rating = user.student_avg_rating;
        $scope.user.student_ratings = user.student_ratings;
        $scope.user.guru_ratings = user.guru_ratings;
        $scope.user.summer_15 = user.summer_15;
        $scope.user.uber_friendly = user.uber_friendly;
        $scope.user.outside_university = user.outside_university;
        $scope.user.credits = parseInt(user.credits) | 0;
        $scope.user.official_guru_grade = user.official_guru_grade;
        $scope.user.grade_dict = user.grade_dict;
        $scope.user.guru_score_opportunities = user.guru_score_opportunities;
        $scope.user.skills = user.skills;
        $scope.user.is_alumni = user.is_alumni;
        $scope.user.professions = user.professions;
        $scope.user.support_tickets = user.support_tickets;
        $scope.user.max_hourly = parseInt(user.max_hourly);

        $scope.user.current_profile_percent = RankingService.calcProfile(user);
        $scope.user.current_credibility_percent = RankingService.calcCredibility(user);
        $scope.user.current_guru_ranking = RankingService.calcRanking(user);


        $localstorage.setObject('user', $scope.user);

        if (!$scope.root.vars.guru_mode && $scope.user.guru_relationships.length) {
            $scope.root.vars.last_active_relationship = $scope.user.guru_relationships[0];
        }

        if ($scope.root.vars.guru_mode && $scope.user.student_relationships.length) {
            $scope.root.vars.last_active_relationship = $scope.user.student_relationships[0];
        }

        RequestService.splitStudentRequestsIntoTypes($scope.user);
    }

    var delegateActionsFromProcessedUser = function($scope) {

        if ($scope.user.impact_events.length > 0) {
            var impact_event = $scope.user.impact_events[0];
            if (impact_event.impacted_user_id === $scope.user.id && !impact_event.impacted_user_notified) {
                //student canceled, guru is notified

                var updateServerEventNotified = function() {
                    $scope.user.updateAttr('impact_event', $scope.user, impact_event.id, null, $scope);
                }

                if (impact_event.status === 4 && impact_event.session_id) {
                    $scope.root.dialog.alert('Unfortunately your student canceled on you', 'Sorry!', 'OK', updateServerEventNotified);
                }
                //student canceled, guru is notified
                else if (impact_event.status === 5 && impact_event.session_id) {
                    $scope.root.dialog.alert('Unfortunately your student canceled on you', 'Sorry!', 'OK', updateServerEventNotified);
                }

                //delete from local
                $scope.user.impact_events.splice(0, 1);
            }
        }

    }

    var initUser = function(properties) {
        var user = {};
        properties = [
            'name', 'email', 'last_position', 'deactivated',
            'university', 'university_id', 'onboarding', 'current_device',
            'auth_token', 'majors', 'guru_mode', 'is_a_guru', 'active_requests',
        ]
        one_to_many_properties = [
            'all_positions', 'active_sessions', 'student_sessions',
            'guru_sessions', 'conversations', 'devices', 'gurus',
            'cards', 'requests', 'student_ratings', 'guru_ratings',
            'student_courses', 'cashout_cards', 'guru_skills', 'guru_courses',
            'guru_languages', 'student_courses', 'departments', 'guru_categories', 'guru_subcategories'
        ];
        for (var index = 0; index < properties.length; index++) {
            var property = properties[index];
            user[property] = null
        }
        for (var index = 0; index < one_to_many_properties.length; index++) {
            var property = one_to_many_properties[index];
            user[property] = [];
        }
        return user;
    }

    User = {
        create: function(user) {
            return Restangular
                .one('user')
                .customPOST(JSON.stringify(user));
        },
        login: function(user) {
            return Restangular
                .one('user')
                .customPUT(JSON.stringify(user));
        },
        checkAccess: function(payload) {
            return Restangular.one('user').customPUT(JSON.stringify(payload));
        },
        alumnOptions: function() {
            return ['am seeking', 'have'];
        },
        yearOptions: function() {
            return ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad/Masters', 'PhD', 'Alumni'];
        },
        initUser: function() {
            var newUser = initUser();
            return newUser;
        },
        process_results: function(user) {
            user = processResults(user);
            return user;
        },
        assign_properties_to_root_scope: function($scope, user) {
            assignPropertiesToRootScope($scope, user);
        },
        delegate_actions_from_processed_user: function(user) {
            return delegateActionsFromProcessedUser(user);
        },
        update: function(user) {
           return Restangular
                .one('user')
                .customPUT(JSON.stringify(user));
        },
        updateAttr: function(payload, user_id) {
           return Restangular
                .one('user', user_id)
                .customPUT(JSON.stringify(payload));
        },
        clearAttr: function(payload, user_id) {
            return Restangular.one('user', user_id).customDELETE();
        },
        updateLocal: function(user) {
           $localstorage.setObject('user', user);
        },
        getPayload: function(arg, user, obj) {
              if (arg === 'add_student_course') {
                  return {
                      course: obj,
                      'add_student_course': true
                  }
              }

              if (arg === 'guru_deposit') {
                return {
                    'guru_deposit': obj
                }
              }

              if (arg === 'guru_committed') {
                return{
                    'guru_committed': obj
                }
              }

              if (arg === 'add_guru_course') {
                  return {
                        course: obj,
                        'add_guru_course': true
                  }
              }

              if (arg === 'add_guru_skill') {
                  return {
                        skill: obj,
                        'add_guru_skill': true
                  }
              }

              if (arg === 'add_guru_profession') {
                  return {
                        profession: obj,
                        'add_guru_profession': true
                  }
              }

              if (arg === 'add_guru_portfolio_item') {
                  return {
                        portfolio_item: obj,
                        'add_guru_portfolio_item': true
                  }
              }

              if (arg === 'edit_guru_portfolio_item') {
                  return {
                        portfolio_item: obj,
                        'edit_guru_portfolio_item': true
                  }
              }

              if (arg === 'update_guru_demographic') {
                return {
                    'update_guru_demographic': obj
                }
              }
              if (arg === 'update_guru_major') {
                return {
                    'update_guru_major': obj
                }
              }

              if (arg === 'remove_guru_portfolio_item') {
                  return {
                        portfolio_item: obj,
                        'remove_guru_portfolio_item': true
                  }
              }

              if (arg === 'remove_guru_course') {
                  return {
                        course: obj,
                        'remove_guru_course': true
                  }
              }
              if (arg === 'remove_student_course') {
                  return {
                        course: obj,
                        'remove_student_course': true
                  }
              }
              if (arg === 'guru_introduction') {
                return {
                    'guru_introduction': obj
                }
              }
              if (arg === 'phone_number') {
                  return {
                        phone_number: obj,
                        'phone_number': true
                  }
              }
              if (arg === 'add_user_major') {
                  return {
                        major: obj,
                        'add_user_major': true
                  }
              }
              if (arg === 'add_guru_intro') {
                  return {
                        introduction: obj,
                        'add_guru_intro': true
                  }
              }
              if(arg === 'update_guru_subcategories'){
                return {
                      subcategory: obj,
                      'update_guru_subcategories': true
                }
              }
              if (arg === 'add_guru_subcategory') {
                  return {
                        subcategory: obj,
                        'add_guru_subcategory': true
                  }
              }
              if (arg === 'remove_guru_subcategory') {
                  return {
                        subcategory: obj,
                        'remove_guru_subcategory': true
                  }
              }

              if (arg === 'update_guru_shop_description') {
                return {
                    'update_guru_shop_description': obj
                    }
              }

              if (arg === 'update_guru_shop_title') {
                return {
                    'update_guru_shop_title': obj
                }
              }

              if (arg === 'impact_event') {
                return {
                    event_id: obj,
                    'impact_event': true
                }
              }
              if (arg === 'discoverability') {
                return {
                    'discoverability': obj
                }
              }
              if (arg === 'profile_url') {
                return {
                    'profile_url': obj
                }
              }
              if (arg === 'tutoring_platforms_description') {
                return {
                    'tutoring_platforms_description': obj
                }
              }
              if (arg === 'university_id') {
                  return obj;
              }
              if (arg === 'current_hourly') {
                  return obj;
              }
              if (arg === 'is_a_guru') {
                return obj;
              }



              if (arg === 'guru_mode') {
                return obj;
              }
              if (arg === 'profile_info') {
                return {
                    'profile_info': obj
                }
              }

              if (arg === 'is_alumni') {
                return {
                    'is_alumni': obj
                }
              }

              if (arg === 'update_guru_currency') {
                return {
                    'update_guru_currency': obj
                }
              }

              if (arg === 'year') {
                return {
                    'year': obj
                }
              }

              if (arg === 'major') {
                return {
                    'major': obj
                }
              }


              if (arg === 'recent_position') {
                return {
                    'recent_position': obj
                }
              }

              if (arg === 'change_password') {
                return {
                    'change_password': obj
                }
              }

              if (arg === 'name') {
                return {
                    'name': obj
                }
              }

              if (arg === 'email') {
                return {
                    'email': obj
                }
              }

              if (arg === 'change_email') {
                return {
                    'change_email': obj
                }
              }

              if (arg === 'push_notifications') {
                return {
                    'push_notifications': obj
                }
              }

              if (arg === 'guru_latest_time') {
                return {
                    'guru_latest_time': obj
                }
              }

              if (arg === 'add_guru_language') {
                return {
                    'add_guru_language': obj
                }
              }

              if (arg === 'remove_guru_language') {
                return {
                    'remove_guru_language': obj
                }
              }

              if (arg === 'add_guru_experience') {
                return {
                    'add_guru_experience': obj
                }
              }

              if (arg === 'add_guru_currency') {
                return {
                    'add_guru_currency': obj
                }
              }

              if (arg === 'update_guru_experience') {
                return {
                    'update_guru_experience': obj
                }
              }

              if (arg === 'remove_guru_experience') {
                return {
                    'remove_guru_experience': obj
                }
              }


              if (arg === 'email_notifications') {
                return {
                    'email_notifications': obj
                }
              }

              if (arg === 'text_notifications') {
                return {
                    'text_notifications': obj
                }
              }

              if (arg === 'phone_number') {
                return {
                    'phone_number': obj
                }
              }

              if (arg === 'uber_friendly') {
                return {
                    'uber_friendly': obj
                }
              }

              if (arg === 'summer_15') {
                return {
                    'summer_15': obj
                }
              }

              if (arg === 'remove_major') {
                return {
                    'remove_major': true,
                    'major': obj
                }
              }

              if (arg === 'outside_university') {
                return {
                    'outside_university': obj
                }
              }

              if (arg === 'devices') {
                return obj;
              }

              if (arg === 'max_hourly') {
                return {
                    'max_hourly': obj
                }
              }

              if (arg === 'skype_friendly') {
                return {
                    'skype_friendly': obj
                }
              }

              if (arg === 'facetime_friendly') {
                return {
                    'facetime_friendly': obj
                }
              }

              if (arg === 'hangouts_friendly') {
                return {
                    'hangouts_friendly': obj
                }
              }

              if (arg === 'text_friendly') {
                return {
                    'text_friendly': obj
                }
              }

              if (arg === 'messenger_friendly') {
                return {
                    'messenger_friendly': obj
                }
              }

              if (arg === 'person_friendly') {
                return {
                    'person_friendly': obj
                }
              }

              if (arg === 'phone_friendly') {
                return {
                    'phone_friendly': obj
                }
              }

              if (arg === 'email_friendly') {
                return {
                    'email_friendly': obj
                }
              }

              if (arg === 'referral_code') {
                return {
                    'referral_code': obj
                }
              }

              if (arg === 'profile_code') {
                return {
                    'profile_code': obj
                }
              }

              if (arg === 'update_external_profile_resource') {
                return {
                    'update_external_profile_resource': true,
                    'payload': obj
                }
              }

              if (arg === 'fb_id') {
                return {
                    'fb_id': obj
                }
              }

              if (arg === 'phone_number_generate') {
                return {
                    'phone_number_generate': obj
                }
              }
              if (arg === 'phone_number_check_token') {
                return {
                    'phone_number_check_token': obj
                }
              }

              if (arg === 'confirm_school_email') {
                return {
                    'confirm_school_email': obj
                }
              }

              if (arg === 'forgot_password') {
                return {
                    'email': obj,
                    'forgot_password': true
                }
              }
        },
        demographics: [
            {
                name: 'College Student',
                class: 'college',
                type:
                    [
                        {name: 'Freshman', class:'freshman'},
                        {name: 'Sophomore', class:'sophomore'},
                        {name: 'Junior', class:'jr'},
                        {name: 'Senior', class:'sr'},
                        {name: 'Grad Student', class:'postgrad'}],
            },
            {name: 'Professional (Alumni)', class: 'alum' },
            {name: 'High School Student', class: 'hs'},
            {name: 'Parent', class: 'parent'},
            {name: 'Other', class: 'other'}],
        getUserFromServer: function($scope, callback, $state) {

            // if ($scope && $scope.root && $scope.root.vars.fetch_user_server_mutex) {
            //     $scope.$broadcast('scroll.refreshComplete');
            //     return;
            // } else if ($scope && $scope.root && !$scope.root.vars.fetch_user_server_mutex) {
            //     $scope.root.vars.fetch_user_server_mutex = true;
            // }

            if ($scope) {
                var scope_user_id = $scope.user.id;
            } else {
                scope_user_id = $localstorage.getObject('user')['id']
            }

            Restangular.one('user', scope_user_id).customGET().then(
                function(user) {
                    var processed_user = processResults(user.plain());
                    if ($scope) {

                        $scope.root.vars.fetch_user_server_mutex = false;
                        assignPropertiesToRootScope($scope, processed_user)
                        delegateActionsFromProcessedUser($scope);

                        $localstorage.setObject('user', $scope.user);

                        if (callback) {
                            callback($scope);
                        }

                        if (callback) {
                            callback($scope, $state);
                        }

                        // if ($scope.user && $scope.user.incoming_requests && $scope.user.incoming_requests.length > 0) {
                        //     $scope.root.vars.processIncomingRequests($scope.user.incoming_requests);
                        // }

                        //  if ($scope.user && $scope.user.active_proposals && $scope.user.active_proposals.length > 0) {
                        //     $scope.root.vars.processActiveProposalsGuru($scope.user.active_proposals);
                        //  }



                    }

                },
                function(error) {
                    console.error('err...something went wrong');
                }
            )
            if (!$state) {
                return;
            }
            if ($state.current.name === 'root.student.home' ||
                $state.current.name === 'root.guru.home') {
                // $timeout(function() {
                //     User.getUserFromServer($scope, null, $state);
                // }, 20000);
            }

        },
        createObj: function(userObj, param, payload, $scope, callback_success, callback_failure) {
            if (param === 'requests') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){

                        var processed_user = processResults(user.plain());
                        assignPropertiesToRootScope($scope, processed_user);;
                        delegateActionsFromProcessedUser($scope);

                        // $scope.doRefresh();
                        LoadingService.hide();

                        if (callback_success) {
                            callback_success($scope, $state);
                        }

                    }, function(err){
                        if (err.status === 409 ) {
                            if (callback_success) {
                                LoadingService.show();
                                callback_success($scope);
                                $scope.closeContactingModal();
                                alert('already have an active request or question for this course!');
                                $timeout(function() {
                                    LoadingService.hide()
                                }, 3000);
                            }

                        } else {
                            if (callback_failure) {
                                callback_failure($scope);
                            }
                            console.error('error...something happened with the server;')
                        }
                    });
            } else if (param === 'cards') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){

                        var processed_user = processResults(user.plain());
                        assignPropertiesToRootScope($scope, processed_user)
                        delegateActionsFromProcessedUser($scope);

                        $localstorage.setObject('user', $scope.user);

                        if (callback_success) {
                            callback_success($scope, $state);
                        }

                    }, function(err){
                        LoadingService.showMsg(err);
                    });
            } else if (param === 'bank_transfer') {
                Restangular
                    .one('user', userObj.id).one('transactions')
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){

                        var processed_user = processResults(user);
                        assignPropertiesToRootScope($scope, processed_user)
                        delegateActionsFromProcessedUser($scope);

                        $localstorage.setObject('user', $scope.user);

                        if (callback_success) {
                            callback_success($scope, $state);
                        }

                    }, function(err){
                        console.error('error...something happened with the server;')
                    });
            } else if (param === 'files') {
                Restangular
                    .one(param)
                    .withHttpConfig({transformRequest: angular.identity})
                    .customPOST(payload,'',undefined,{'Content-Type': undefined})
                    .then(function(file){


                            if ($ionicSideMenuDelegate.isOpen() && $state.current.name === 'root.home') {
                                $scope.user.profile_url = file.plain().url;
                                $localstorage.setObject('user', $scope.user);
                                $scope.user.updateAttr('profile_url', $scope.user, $scope.user.profile_url, null, $scope, null);
                            }
                            else if ($state.current.name === 'root.home') {
                                $scope.request.files.push(file.plain());
                            }
                            else if ($state.current.name === 'root.guru-questions') {
                                $scope.proposal.files.push(file.plain());
                            }
                            else if ($scope.root.vars.profile_url_changed) {
                                $scope.root.vars.profile_url_changed = false;
                                $scope.user.profile_url = file.plain().url;
                                $localstorage.setObject('user', $scope.user);
                            }
                            else if ($scope.root.vars.transcript_url_changed) {
                                $scope.root.vars.transcript_url_changed = false;
                                $scope.user.transcript_file = file.plain();
                                $localstorage.setObject('user', $scope.user);
                            }
                            else {
                                $scope.user.profile_url = file.plain().url;
                                $localstorage.setObject('user', $scope.user);
                            }

                            if (callback_success) {
                                callback_success($scope, $state);
                                $timeout(function() {
                                    LoadingService.hide();
                                }, 4000);
                            };


                    }, function(err){
                        console.error('error...something happened with the server;')
                    });
            } else if (param === 'sessions') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){
                        var processed_user = processResults(user.plain())

                        assignPropertiesToRootScope($scope, processed_user)
                        delegateActionsFromProcessedUser($scope);

                        $localstorage.setObject('user', processed_user);
                        if (callback_success) {
                            callback_success($scope, processed_user)
                        }

                    }, function(err){
                        console.error('error...something happened with the server;')
                    });
            }

            else if (param === 'messages') {
                Restangular
                    .one('user', userObj.id).one('relationships', payload.message.relationship_id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){
                        var processed_user = processResults(user)
                        $localstorage.setObject('user', processed_user);
                        if (callback_success) {
                            callback_success($scope, processed_user)
                        }

                    }, function(err){
                        console.error('error...something happened with the server;')
                    });
            }

            else if (param === 'device') {
                Restangular
                    .one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(device){
                        $scope.user.current_device = device;
                        $localstorage.setObject('user', $scope.user);

                        if (deviceReadyLoadTime) {
                            $scope.user.current_device.device_load_time = deviceReadyLoadTime;
                        }
                        if (bodyLoadTime) {
                            $scope.user.current_device.body_load_time = bodyLoadTime;
                        }

                        if (Utilities.getNetworkSpeed) {
                            $scope.user.current_device.network_speed = Utilities.getNetworkSpeed();
                        }

                        $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);


                    }, function(err){
                        console.error('error...something happened with the server;')
                    });
            }



        },
        updateObj: function(userObj, param, payload, $scope, callback_success) {
            if (param === 'requests') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPUT(JSON.stringify(payload))
                    .then(function(user){

                        var processed_user = processResults(user.plain());
                        assignPropertiesToRootScope($scope, processed_user);
                        delegateActionsFromProcessedUser($scope);

                        $localstorage.setObject('user', $scope.user);

                        if (callback_success) {
                            callback_success($scope, processed_user)
                        }

                    }, function(err){
                    if (err.status === 409) {
                            console.error('already have an active request');
                        } else {
                            console.error('error...something happened with the server;')
                        }
                    });
            }

            if (param === 'sessions') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPUT(JSON.stringify(payload))
                    .then(function(user){
                        var processed_user = processResults(user);
                        assignPropertiesToRootScope($scope, processed_user)
                        delegateActionsFromProcessedUser($scope);
                        if (callback_success) {
                            callback_success();
                        }

                        LoadingService.hide();

                    }, function(err){
                    if (err.status === 409 ) {
                            console.error('already have an active request');
                        } else {
                            console.error('error...something happened with the server;')
                        }
                    });
            }

            if (param === 'ratings') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPUT(JSON.stringify(payload))
                    .then(function(user){
                        var processed_user = processResults(user);
                        $localstorage.setObject('user', processed_user);

                        if (callback_success) {
                            callback_success($scope, processed_user)
                        }

                    }, function(err){
                    if (err.status === 409 ) {
                            console.error('already have an active request');
                        } else {
                            console.error('error...something happened with the server;')
                        }
                    });
            }
            if (param === 'cards') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPUT(JSON.stringify(payload))
                    .then(function(user){
                        var processed_user = processResults(user.plain());
                        assignPropertiesToRootScope($scope, processed_user)
                        delegateActionsFromProcessedUser($scope);

                        $localstorage.setObject('user', $scope.user);

                        if (callback_success) {
                            callback_success($scope, processed_user)
                        }

                    }, function(err){
                    if (err.status === 409 ) {
                            console.error('already have an active request');
                        } else if (err.status === 400) {
                            console.error(err);
                            LoadingService.showMsg('Insufficient funds on card. Please try again or contact support.', 2500);
                        }
                    });
            }
            if (param === 'devices') {
                Restangular
                    .one('devices', userObj.id)
                    .customPUT(JSON.stringify(payload))
                    .then(function(device){
                        $scope.user.current_device = device;
                        $scope.user.push_notifications = $scope.user.current_device.push_notif_enabled;
                        if (!$scope.user.devices) {
                            $scope.user.devices = []
                        }

                        $scope.user.devices.push(device)

                        $localstorage.setObject('user', $scope.user);
                    },
                    function(err) {

                        if (err.status === 409 ) {
                            console.error('already have an active request');
                        } else {
                            console.error('error...something happened with the server;')
                        }

                    });
            }

        },
        clearAttrUser: function(payload, $scope) {

            User.clearAttr(payload, $scope.user.id).then(function(user) {

                var processed_user = processResults(user.plain());

                assignPropertiesToRootScope($scope, processed_user)

                delegateActionsFromProcessedUser($scope);

                $localstorage.setObject('user', $scope.user);


            }, function(err){

                    console.error('error...something happened with the server;')
            });

        },
        updateAttrUser: function(arg, user, obj, success_callback, $scope, failure_callback) {

            if (!user.id && arg !== 'forgot_password') {

              //save to local
              $localstorage.setObject('user', user);

              if (success_callback) {
                success_callback();
              }
              if (failure_callback) {
                failure_callback();
              }
              return
            }

            var payload = User.getPayload(arg, user, obj);

            if (!user.id) {
                user.id = 1;
            }

            User.updateAttr(payload, user.id).then(function(user) {

                if (arg !== 'forgot_password') {
                    var processed_user = processResults(user.plain());
                    assignPropertiesToRootScope($scope, processed_user)
                    delegateActionsFromProcessedUser($scope);
                    $localstorage.setObject('user', $scope.user);
                }

                if (success_callback) {
                    success_callback();
                }

                if (failure_callback) {
                    failure_callback();
                }

            }, function(err){
                if (failure_callback) {
                    failure_callback(err);
                } else {
                    console.error('error...something happened with the server;')
                }
            })
        },
        getLocal: function() {


            var localUser = $localstorage.getObject('user');

            //new user
            if (localUser.length === 0) {
                var newUser = initUser();
                $localstorage.setObject('user', newUser);

                if (!newUser.devices || !newUser.current_device)  {

                    var currentDevice = $localstorage.getObject('device')
                    if (currentDevice) {
                        newUser.devices.push(currentDevice);
                        newUser.current_device = currentDevice;
                    }

                }

                return newUser;
            } else {
                //old user from before
                return localUser;
            }


        },
        logout: function() {
           $localstorage.removeObject('user');
        }
    };
    return User;
}]);