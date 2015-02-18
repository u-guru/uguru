angular.module('uguru.user', [])
.factory('User', ['$localstorage', 'Restangular', '$state',
    function($localstorage, Restangular, $state) {
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
              else {
                user.previous_requests.push(index_request);
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



        if (user.is_a_guru) {
            user.active_proposals = [];
            user.pending_proposals = [];

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
           console.log('user saved locally!');
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
        getUserFromServer: function($scope) {

            if ($scope) {
                var scope_user_id = $scope.user.id;
            } else {
                scope_user_id = $localstorage.getObject('user')['id']
            }

            Restangular.one('user', scope_user_id).customGET().then(
                function(user) {
                    var processed_user = processResults(user.plain());
                    if ($scope) {
                        $scope.user = processed_user;
                    } else {
                        $localstorage.setObject('user', processed_user);
                    }
                },
                function(error) {
                    console.log(error);
                    console.log('err...something went wrong');
                }
            )
        },
        createObj: function(userObj, param, payload, $scope) {
            if (param === 'requests') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPOST(JSON.stringify(payload))
                    .then(function(user){
                        console.log(user);
                        $scope.user = processResults(user);
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
                        console.log(user);
                        $scope.user = processResults(user);
                        $state.go('^.home');
                        // $scope.user.requests.push(request);
                        // $scope.rootUser.updateLocal($scope.user);
                    }, function(err){
                        console.log(err);
                        console.log('error...something happened with the server;')
                    });
            }
        },
        updateObj: function(userObj, param, payload, $scope) {
            if (param === 'requests') {
                Restangular
                    .one('user', userObj.id).one(param)
                    .customPUT(JSON.stringify(payload))
                    .then(function(request){

                        // $scope.user.requests.push(request);
                        // $scope.rootUser.updateLocal($scope.user);
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
        updateAttrUser: function(arg, user, obj, success_callback) {
            if (!user.id) {
              console.log('user has not created an account yet.')
              return
            }

            var payload = User.getPayload(arg, user, obj);

            User.updateAttr(payload, user.id).then(function(response) {
                console.log('new user', response.plain());
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