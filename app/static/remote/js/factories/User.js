angular.module('uguru.user', [])
.factory('User', ['$localstorage', 'Restangular', '$state', '$timeout', '$ionicModal', '$ionicHistory', 'RootService',
    function($localstorage, Restangular, $state, $timeout, $ionicModal, $ionicHistory, RootService) {
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

    var calcAverage = function(ratings_arr) {
                if (ratings_arr.length === 0)  {
                    return 0;
                }
                result = 0;
                for (var i = 0; i < ratings_arr.length; i ++) {
                    if (ratings_arr[i].student_rating) {
                        result += ratings_arr[i].student_rating;
                    } else {
                        result += ratings_arr[i].guru_rating;
                    }
                }
                result = (result / ratings_arr.length).toFixed(2);
                return result;
    }

    var processResults = function(user) {
        user.active_requests = [];
        user.pending_guru_ratings = [];
        user.pending_student_ratings = [];
        user.incoming_requests = [];
        user.previous_requests = [];
        user.active_student_sessions = [];
        user.previous_student_sessions = [];
        user.payment_cards = [];
        user.transfer_cards = [];
        user.course_guru_dict = {};
        user.gurus = [];
        user.current_hourly = 10;
        // user.uber_friendly = false;
        // user.summer_15 = false;

        var user_cards = user.cards;
        for (var i = 0; i < user_cards.length; i++) {
            var card = user_cards[i];

            //payment cards processing
            if (card.is_default_payment) {
                user.default_payment_card = card;
            }
            if (card.is_payment_card) {
                user.payment_cards.push(card);
            }
            //transfer cards processing
            if (card.is_transfer_card) {
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
                user.active_requests.push(index_request);
              }
              else if (index_request.status === 1) {
                    index_request.guru.guru_avg_rating = parseInt(calcAverage(index_request.guru.guru_ratings));
                    user.incoming_requests.push(index_request);
                } else {
                    user.previous_requests.push(index_request);
                }
            }
        }
        var student_sessions = user.student_sessions;
        if (student_sessions && student_sessions.length > 0) {
            for (var i = 0; i < student_sessions.length; i ++) {
              var index_session = student_sessions[i];
              if (index_session.status === 0 || index_session.status === 1 || index_session.status === 2) {
                index_session.guru.guru_avg_rating = parseInt(calcAverage(index_session.guru.guru_ratings));
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
        user.student_avg_rating = calcAverage(student_ratings);

        var student_transactions = user.student_transactions;
        MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        for (var i = 0; i < student_transactions.length; i ++) {
            var utc = Date.parse(student_transactions[0].time_created);
            var date = new Date(utc);
            user.student_transactions[i].time = {date: date.getDate(), month: MONTHS[date.getMonth()]}
            user.student_transactions[i].student_amount = parseFloat(user.student_transactions[i].student_amount).toFixed(2);
            user.student_transactions[i].guru_amount = parseFloat(user.student_transactions[i].guru_amount).toFixed(2);
            user.student_transactions[i].student_rate = 5;
        }

        var guru_transactions = user.guru_transactions;
        for (var i = 0; i < guru_transactions.length; i ++) {
            var utc = Date.parse(guru_transactions[0].time_created);
            var date = new Date(utc);
            user.guru_transactions[i].time = {date: date.getDate(), month: MONTHS[date.getMonth()]}
            user.guru_transactions[i].student_amount = parseFloat(user.guru_transactions[i].student_amount).toFixed(2);
            user.guru_transactions[i].guru_amount = parseFloat(user.guru_transactions[i].guru_amount).toFixed(2);
            user.guru_transactions[i].guru_rate = 5;
        }


        var transfer_transactions = user.transfer_transactions;
        for (var i = 0; i < transfer_transactions.length; i ++) {
            var utc = Date.parse(transfer_transactions[0].time_created);
            var date = new Date(utc);
            user.transfer_transactions[i].time = {date: date.getDate(), month: MONTHS[date.getMonth()]}
            user.transfer_transactions[i].student_amount = parseFloat(user.transfer_transactions[i].student_amount).toFixed(2);
            user.transfer_transactions[i].guru_amount = parseFloat(user.transfer_transactions[i].guru_amount).toFixed(2);
        }

        // user.guru_mode = true;
        if (user.is_a_guru) {
            if (!user.balance) {
                user.balance = 0;
            } else {
                Math.round(user.balance, 2);
            }
            if (!user.total_earned) {
                user.total_earned = 0;
            }
            user.active_proposals = [];
            user.pending_proposals = [];
            user.active_guru_sessions = [];
            user.previous_guru_proposals = [];
            user.pending_student_ratings = [];
            user.previous_guru_sessions = [];

            var guru_ratings = user.guru_ratings;
            user.guru_avg_rating = calcAverage(guru_ratings);
            console.log()
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
                    }
                    user.pending_student_ratings.push(index_rating);
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
                    index_session.student.student_avg_rating = parseInt(calcAverage(index_session.student.student_ratings));
                    user.active_guru_sessions.push(index_session);
                  } else if (index_session.status === 6 || index_session.status === 7 || index_session.status === 8 ) {
                    user.previous_guru_sessions.push(index_session);
                  }
                }
            }

            var user_proposals = user.proposals;
            if (user.proposals && user.proposals.length > 0) {
                for (var i = 0; i < user_proposals.length; i ++) {
                    var index_proposal = user_proposals[i];
                    if (index_proposal.status === 0 && index_proposal.request.status !==0) {
                        user.previous_guru_proposals.push(index_proposal);
                    }
                    if (index_proposal.status === 0 && index_proposal.request.status === 0) {
                        index_proposal.formatted_time = RootService.time.since(new Date(index_proposal.time_created));
                        user.active_proposals.push(index_proposal);
                    }
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
        $scope.user.profile_url = user.profile_url;
        $scope.user.is_a_guru = user.is_a_guru;
        // $scope.user.guru_mode = user.guru_mode;
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
        $scope.user.majors = user.majors
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
        $scope.user.proposals = user.proposals;
        $scope.user.cards = user.cards;
        $scope.user.student_transactions = user.student_transactions;
        $scope.user.guru_transactions = user.guru_transactions;
        $scope.user.transfer_transactions = user.transfer_transactions;
        $scope.user.transfer_cards = user.transfer_cards;
        $scope.user.payment_cards = user.payment_cards;
        $scope.user.default_payment_card = user.default_payment_card;
        $scope.user.default_transfer_card = user.default_transfer_card;
        $scope.user.course_guru_dict = user.course_guru_dict;
        $scope.user.gurus = user.gurus;
        $scope.user.guru_relationships = user.guru_relationships;
        $scope.user.referred_by = user.referred_by;
        $scope.user.current_device = user.current_device;
        $scope.user.devices = user.devices;
        $scope.user.current_hourly = user.current_hourly;
        $scope.user.previous_guru_proposals = user.previous_guru_proposals;
        $scope.user.is_admin = user.is_admin;

        $scope.user.text_notifications = user.text_notifications;
        $scope.user.email_notifications = user.email_notifications;
        $scope.user.email = user.email;
        $scope.user.push_notifications = user.push_notifications;
        $scope.user.phone_number = user.phone_number;
        $scope.user.active_proposals = user.active_proposals;
        $scope.user.impact_events = user.impact_events;
        $scope.user.pending_proposals = user.pending_proposals;
        $scope.user.active_guru_sessions = user.active_guru_sessions;
        $scope.user.pending_student_ratings = user.pending_student_ratings;
        $scope.user.previous_guru_sessions = user.previous_guru_sessions;
        $scope.user.active_requests = user.active_requests;
        $scope.user.pending_guru_ratings = user.pending_guru_ratings;
        $scope.user.pending_student_ratings = user.pending_student_ratings;
        $scope.user.incoming_requests = user.incoming_requests;
        $scope.user.previous_requests = user.previous_requests;
        $scope.user.active_student_sessions = user.active_student_sessions;
        $scope.user.previous_student_sessions = user.previous_student_sessions;
        $scope.user.balance = user.balance;
        $scope.user.total_earned = user.total_earned;
        $scope.user.estimated_guru_rank = user.estimated_guru_rank;
        $scope.user.official_guru_rank = user.official_guru_rank;
        $scope.user.estimated_guru_score = user.estimated_guru_score;
        $scope.user.official_guru_score = user.official_guru_score;
        $scope.user.estimated_guru_rank_last_updated = user.estimated_guru_rank_last_updated;
        $scope.user.official_guru_rank_last_updated = user.official_guru_rank_last_updated;
        $scope.user.guru_avg_rating = user.guru_avg_rating;
        $scope.user.student_avg_rating = user.student_avg_rating;
        $scope.user.student_ratings = user.student_ratings;
        $scope.user.guru_ratings = user.guru_ratings;
        $scope.user.summer_15 = user.summer_15;
        $scope.user.uber_friendly = user.uber_friendly;
        $scope.user.outside_university = user.outside_university;
        $scope.user.credits = user.credits;
        $scope.user.official_guru_grade = user.official_guru_grade;
        $scope.user.grade_dict = user.grade_dict;
        $scope.user.guru_score_opportunities = user.guru_score_opportunities;
        // $scope.user.guru_mode = true;
        // $scope.user.is_a_guru = true;
        $localstorage.setObject('user', $scope.user);
    }

    var delegateActionsFromProcessedUser = function($scope) {

        //student actionsif ($scope.user.incoming_requests.length > 0 && !$scope.user.guru_mode) {
        //     var first_incoming_request = $scope.user.incoming_requests[0];
        //     var paramPayload = {
        //         requestObj:JSON.stringify(first_incoming_request),
        //     }
        //     if ($state.current.name != 'root.student.guru-available') {
        //          $state.go('^.^.student.guru-available', paramPayload);
        //     } else {
        //         $state.go('^.guru-available', paramPayload);
        //     }
        // }
        //

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

        //student proposals
        // if ($scope.user.guru_mode && $scope.user.active_proposals && $scope.user.active_proposals.length > 0) {

        //     $timeout(function() {
        //       var first_active_proposal = $scope.user.active_proposals[0];
        //       var paramPayload = {
        //         requestObj:JSON.stringify(first_active_proposal.request),
        //         proposalObj: JSON.stringify(first_active_proposal)
        //       }

        //         if ($state.current.name === 'root.guru.home') {
        //             $state.go('^.student-available', paramPayload);
        //         }
        //     }, 500)
        // }

        //otherwise they're already home
        // if ($scope.user.guru_mode && $state.current.name === 'root.student.home') {
        //     $state.go('^.^.guru.home');
        // }

        // if (!$scope.user.guru_mode && $state.current.name === 'root.guru.home') {
        //     $state.go('^.^.student.home');
        // }

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
            'student_courses', 'cashout_cards'
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
        console.log('user saved remotely!');
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
              if (arg === 'add_guru_course') {
                  return {
                        course: obj,
                        'add_guru_course': true
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
              if (arg === 'email') {
                  return {
                        email: obj,
                        'email': true
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
              if (arg === 'impact_event') {
                return {
                    event_id: obj,
                    'impact_event': true
                }
              }
              if (arg === 'university_id') {
                  return {
                      'university_id': obj
                  }
              }
              if (arg === 'is_a_guru') {
                return {
                    'is_a_guru': obj
                }
              }
              if (arg === 'guru_mode') {
                return {
                    'guru_mode': obj
                }
              }
              if (arg === 'profile_info') {
                return {
                    'profile_info': obj
                }
              }
              if (arg === 'change_password') {
                return {
                    'change_password': obj
                }
              }

              if (arg === 'push_notifications') {
                return {
                    'push_notifications': obj
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

              if (arg === 'outside_university') {
                return {
                    'outside_university': obj
                }
              }

              if (arg === 'devices') {
                return obj;
              }
        },
        getUserFromServer: function($scope, callback, $state) {

            // if ($scope && $scope.root && $scope.root.vars.fetch_user_server_mutex) {
            //     // console.log('There is already a server process updating the user');
            //     // console.log('Exiting...');
            //     $scope.$broadcast('scroll.refreshComplete');
            //     return;
            // } else if ($scope && $scope.root && !$scope.root.vars.fetch_user_server_mutex) {
            //     // console.log('No mutex set, setting to true');
            //     // console.log('Mutex on, fetching user');
            //     $scope.root.vars.fetch_user_server_mutex = true;
            // }

            if ($scope) {
                var scope_user_id = $scope.user.id;
            } else {
                console.log('accessing user from local..')
                scope_user_id = $localstorage.getObject('user')['id']
            }
            if (!scope_user_id) {
                console.log('Cant fetch user, user not logged in');
                $scope.$broadcast('scroll.refreshComplete');
                return;
            }

            else {
                // console.log('Fetching user from ', $state.current.name);
            }


            Restangular.one('user', scope_user_id).customGET().then(
                function(user) {
                    var processed_user = processResults(user.plain());
                    $scope.$broadcast('scroll.refreshComplete');
                    if ($scope) {

                        $scope.root.vars.fetch_user_server_mutex = false;
                        assignPropertiesToRootScope($scope, processed_user)
                        delegateActionsFromProcessedUser($scope);

                        if ($scope.loader) {
                            $scope.loader.hide();
                        }

                        if (callback) {
                            callback($scope);
                        }

                    }

                },
                function(error) {
                    console.log(error);
                    console.log('err...something went wrong');
                }
            )

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
                        $scope.loader.hide();

                        if (callback_success) {
                            callback_success($scope, $state);
                        }

                    }, function(err){
                        if (err.status === 409 ) {
                            if (callback_success) {
                                callback_success($scope);
                                alert('already have an active request for this course!');
                            }

                        } else {
                            console.log(JSON.stringify(err));
                            if (callback_failure) {
                                callback_failure($scope);
                            }
                            console.log('error...something happened with the server;')
                        }
                    });
            } else if (param === 'cards') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){

                        var processed_user = processResults(user);
                        assignPropertiesToRootScope($scope, processed_user)
                        delegateActionsFromProcessedUser($scope);

                        $localstorage.setObject('user', $scope.user);

                    }, function(err){
                        console.log(JSON.stringify(err));
                        console.log('error...something happened with the server;')
                    });
            } else if (param === 'transactions') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){

                        var processed_user = processResults(user);
                        assignPropertiesToRootScope($scope, processed_user)
                        delegateActionsFromProcessedUser($scope);

                        $localstorage.setObject('user', $scope.user);

                    }, function(err){
                        console.log(JSON.stringify(err));
                        console.log(err);
                        console.log('error...something happened with the server;')
                    });
            } else if (param === 'files') {
                Restangular
                    .one(param)
                    .withHttpConfig({transformRequest: angular.identity})
                    .customPOST(payload,'',undefined,{'Content-Type': undefined})
                    .then(function(file){
                        console.log(JSON.stringify(file.plain()));



                            if ($state.current.name === 'root.home') {
                                $scope.request.attached_files.push(file.plain());
                            } else {
                                $scope.user.profile_url = file.plain().url;
                                $localstorage.setObject('user', $scope.user);
                            }
                            $scope.loader.hide();
                            if ($state.current.name !== 'root.request-description') {
                                $scope.success.show(0, 1500);
                            }

                    }, function(err){
                        console.log(err);
                        console.log('error...something happened with the server;')
                    });
            } else if (param === 'sessions') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){
                        var processed_user = processResults(user.plain())
                        $localstorage.setObject('user', processed_user);
                        console.log('student has accepted guru');
                        console.log(processed_user)
                        if (callback_success) {
                            callback_success($scope, processed_user)
                        }

                    }, function(err){
                        console.log(err);
                        console.log('error...something happened with the server;')
                    });
            }

            else if (param === 'messages') {
                Restangular
                    .one('user', userObj.id).one('sessions', payload.message.session_id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){
                        var processed_user = processResults(user)
                        $localstorage.setObject('user', processed_user);
                        $scope.$broadcast('scroll.refreshComplete');
                        if (callback_success) {
                            callback_success($scope, processed_user)
                        }

                    }, function(err){
                        console.log(err);
                        console.log('error...something happened with the server;')
                    });
            }

            else if (param === 'device') {
                Restangular
                    .one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(device){
                        $scope.user.current_device = device;
                        $localstorage.setObject('user', $scope.user);

                    }, function(err){
                        console.log(err);
                        console.log('error...something happened with the server;')
                    });
            }



        },
        updateObj: function(userObj, param, payload, $scope, callback_success) {
            if (param === 'requests') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPUT(JSON.stringify(payload))
                    .then(function(user){
                        var processed_user = processResults(user);
                        assignPropertiesToRootScope($scope, processed_user)
                        delegateActionsFromProcessedUser($scope);

                        $localstorage.setObject('user', $scope.user);

                        //TODO GET RID OF THIS
                        // $state.go('^.home');

                        if (callback_success) {
                            callback_success($scope, processed_user)
                        }

                    }, function(err){
                    if (err.status === 409) {
                            console.log('already have an active request');
                        } else {
                            console.log(err);
                            console.log('error...something happened with the server;')
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

                    }, function(err){
                    if (err.status === 409 ) {
                            console.log('already have an active request');
                        } else {
                            console.log(err);
                            console.log('error...something happened with the server;')
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
                            console.log('already have an active request');
                        } else {
                            console.log(err);
                            console.log('error...something happened with the server;')
                        }
                    });
            }
            if (param === 'cards') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPUT(JSON.stringify(payload))
                    .then(function(user){
                        var processed_user = processResults(user.plain());
                        console.log(processed_user)
                        assignPropertiesToRootScope($scope, processed_user)
                        delegateActionsFromProcessedUser($scope);

                        $localstorage.setObject('user', $scope.user);

                        if (callback_success) {
                            callback_success($scope, processed_user)
                        }

                    }, function(err){
                    if (err.status === 409 ) {
                            console.log('already have an active request');
                        } else {
                            console.log(err);
                            console.log('error...something happened with the server;')
                        }
                    });
            }
            if (param === 'devices') {
                Restangular
                    .one('devices', userObj.id)
                    .customPUT(JSON.stringify(payload))
                    .then(function(device){
                        console.log('device returned from server');
                        console.log(JSON.stringify(device));
                        $scope.user.current_device = device;
                        $scope.user.push_notifications = $scope.user.current_device.push_notif_enabled;
                        console.log('user push notifications are now', $scope.user.push_notifications);
                        if (!$scope.user.devices) {
                            $scope.user.devices = []
                        }

                        $scope.user.devices.push(device)

                        $localstorage.setObject('user', $scope.user);
                    },
                    function(err) {

                        if (err.status === 409 ) {
                            console.log('already have an active request');
                        } else {
                            console.log(err);
                            console.log('error...something happened with the server;')
                        }

                    });
            }

        },
        clearAttrUser: function(payload, $scope) {

            User.clearAttr(payload, user.id).then(function(user) {

                var processed_user = processResults(user.plain());

                assignPropertiesToRootScope($scope, processed_user)

                delegateActionsFromProcessedUser($scope);

                $localstorage.setObject('user', $scope.user);


            }, function(err){

                    console.log(err);
                    console.log('error...something happened with the server;')
            });

        },
        updateAttrUser: function(arg, user, obj, success_callback, $scope) {
            if (!user.id) {
              console.log('user has not created an account yet.')
              return
            }

            var payload = User.getPayload(arg, user, obj);
            User.updateAttr(payload, user.id).then(function(user) {

                var processed_user = processResults(user.plain());
                console.log(processed_user);
                assignPropertiesToRootScope($scope, processed_user)
                delegateActionsFromProcessedUser($scope);
                $localstorage.setObject('user', $scope.user);

                if (success_callback) {
                    success_callback();
                }
            }, function(err){
                if (success_callback) {
                    success_callback(err);
                } else {
                    console.log(err);
                    console.log('error...something happened with the server;')
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