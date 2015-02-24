angular.module('uguru.user', [])
.factory('User', ['$localstorage', 'Restangular', '$state', '$timeout', '$ionicModal',
    function($localstorage, Restangular, $state, $timeout, $ionicModal) {
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

    var processResults = function(user) {
        user.active_requests = [];
        user.pending_guru_ratings = [];
        user.pending_student_ratings = [];
        user.incoming_requests = [];
        user.previous_requests = [];
        user.active_student_sessions = [];
        user.previous_student_sessions = [];

        var user_requests = user.requests;
        if (user_requests && user_requests.length > 0) {
            for (var i = 0; i < user_requests.length; i ++) {
              var index_request = user_requests[i];
              if (index_request.status === 0) {
                user.active_requests.push(index_request);
              }
              else if (index_request.status === 1) {
                user.incoming_requests.push(index_request);
                }
            }
        }
        var student_sessions = user.student_sessions;
        if (student_sessions && student_sessions.length > 0) {
            for (var i = 0; i < student_sessions.length; i ++) {
              var index_session = student_sessions[i];
              if (index_session.status === 0 || index_session.status === 1 || index_session.status === 2) {
                user.active_student_sessions.push(index_session);
              } else {
                user.previous_student_sessions.push(index_session);
              }
            }
        }

        var student_ratings = user.student_ratings;
        if (student_ratings && student_ratings.length > 0) {
            for (var i = 0; i < student_ratings.length; i ++) {
              var index_rating = student_ratings[i];
              if (index_rating.guru_rating === 0 && user.id === index_rating.student_id) {
                user.pending_guru_ratings.push(index_rating);
              }
            }
        }

        if (user.incoming_requests.length > 0 && !user.guru_mode) {
            var first_incoming_request = user.incoming_requests[0];

            var paramPayload = {
                requestObj:JSON.stringify(first_incoming_request),
            }
            if ($state.current.name != 'root.student.guru-available') {
                 $state.go('^.^.student.guru-available', paramPayload);
            } else {
                $state.go('^.guru-available', paramPayload);
            }
        }

        if (user.is_a_guru && user.guru_mode) {
            user.active_proposals = [];
            user.pending_proposals = [];
            user.active_guru_sessions = [];
            user.pending_student_ratings = [];
            user.previous_guru_sessions = [];

            var guru_ratings = user.guru_ratings;
            if (guru_ratings && guru_ratings.length > 0) {
                for (var i = 0; i < guru_ratings.length; i ++) {
                  var index_rating = guru_ratings[i];
                  if (index_rating.student_rating === 0 && user.id === index_rating.guru_id) {
                    user.pending_student_ratings.push(index_rating);
                  }
                }
            }

            var guru_sessions = user.guru_sessions;
            if (guru_sessions && guru_sessions.length > 0) {
                for (var i = 0; i < guru_sessions.length; i ++) {
                  var index_session = guru_sessions[i];
                  if (index_session.status === 0 || index_session.status === 1 || index_session.status === 2) {
                    user.active_guru_sessions.push(index_session);
                  } else {
                    user.previous_guru_sessions.push(index_session);
                  }
                }
            }

            var user_proposals = user.proposals;
            if (user.proposals && user.proposals.length > 0) {
                for (var i = 0; i < user_proposals.length; i ++) {
                    var index_proposal = user_proposals[i];
                    if (index_proposal.status === 0) {
                        user.active_proposals.push(index_proposal);
                    }
                    if (index_proposal.status === 2) {
                        user.pending_proposals.push(index_proposal);
                    }
                }

                //guru has incoming proposal
                if (user.active_proposals && user.active_proposals.length > 0) {

                    $timeout(function() {
                      var first_active_proposal = user.active_proposals[0];

                      var paramPayload = {
                        requestObj:JSON.stringify(first_active_proposal.request),
                        proposalObj: JSON.stringify(first_active_proposal)
                      }

                        if ($state.current.name === 'root.guru.home') {
                            $state.go('^.student-available', paramPayload);
                        }
                    }, 500)

                }

            }

        }

        user.updateAttr = User.updateAttrUser;
        user.createObj = User.createObj;
        user.updateObj = User.updateObj;
        return user;
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
        process_results: function(user) {
            user = processResults(user);
            return user;
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
        },
        getUserFromServer: function($scope, callback, $state) {

            if ($scope) {
                var scope_user_id = $scope.user.id;
            } else {
                scope_user_id = $localstorage.getObject('user')['id']
            }
            if (!scope_user_id) {
                console.log('Cant fetch user, user not logged in');
                $scope.guru_mode = false;
                return;
            }

            else {
                // console.log('Fetching user from ', $state.current.name);
            }

            Restangular.one('user', scope_user_id).customGET().then(
                function(user) {
                    var processed_user = processResults(user.plain());
                    if ($scope) {
                        $scope.user = processed_user;
                        $localstorage.setObject('user', $scope.user);
                    }
                    if (callback) {
                        callback($scope);
                    } else {
                        //add all cases
                        if (($scope.user.pending_guru_ratings || $scope.user.pending_student_ratings) &&
                            (($scope.user.pending_guru_ratings.length > 0 && !user.guru_mode) ||
                            ($scope.user.pending_student_ratings.length > 0 && user.guru_mode))) {

                            $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/ratings.modal.html', {
                                  scope: $scope,
                                  animation: 'slide-in-up'
                            }).then(function(modal) {
                                  $scope.ratingModal = modal;
                            });

                            $timeout(function() {
                                if (!$scope.ratingModal.isShown() && !$scope.ratingModalShown) {
                                    $scope.ratingModal.show();
                                }
                            }, 1000);


                        }

                        //otherwise they're already home
                        if ($scope.user.guru_mode && $state.current.name === 'root.student.home') {
                            $state.go('^.^.guru.home');
                        }

                        if (!$scope.user.guru_mode && $state.current.name === 'root.guru.home') {
                            $state.go('^.^.student.home');
                        }

                    }


                    // if ($state.current.name === 'root.student.messages') {
                    //     $scope.user.active_student_sessions = processed_user.active_student_sessions;
                    //     console.log('print current state session');
                    // }
                },
                function(error) {
                    console.log(error);
                    console.log('err...something went wrong');
                }
            )

            if ($state.current.name === 'root.student.home' ||
                $state.current.name === 'root.guru.home') {
                $timeout(function() {
                    User.getUserFromServer($scope, null, $state);
                }, 20000);
            }

        },
        createObj: function(userObj, param, payload, $scope, callback_success) {
            if (param === 'requests') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){
                        $scope.user = processResults(user);
                        $localstorage.setObject('user', $scope.user);
                    }, function(err){
                        if (err.status === 409 ) {
                            console.log('already have an active request');
                        } else {
                            console.log(err);
                            console.log('error...something happened with the server;')
                        }
                    });
            } else if (param === 'cards') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){
                        $scope.user.cards = user.cards;
                        console.log($scope.user.cards);
                        // $scope.user.requests.push(request);
                        // $scope.rootUser.updateLocal($scope.user);
                    }, function(err){
                        console.log(err);
                        console.log('error...something happened with the server;')
                    });
            } else if (param === 'sessions') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){
                        var processed_user = processResults(user)
                        $localstorage.setObject('user', processed_user);

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

                        if (callback_success) {
                            callback_success($scope, processed_user)
                        }

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
                        $localstorage.setObject('user', processed_user);
                        $state.go('^.home');

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

            if (param === 'sessions') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPUT(JSON.stringify(payload))
                    .then(function(session){
                        $scope.session = session.plain();
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

        },
        updateAttrUser: function(arg, user, obj, success_callback, $scope) {
            if (!user.id) {
              console.log('user has not created an account yet.')
              return
            }

            var payload = User.getPayload(arg, user, obj);
            User.updateAttr(payload, user.id).then(function(user) {

                var processedUser = processResults(user);
                $localstorage.setObject('user', processedUser);

                if ($scope) {
                    $scope.user = processedUser;
                }

                if (success_callback) {
                    success_callback();
                }
            }, function(err){
                console.log(err);
                console.log('error...something happened with the server;')
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