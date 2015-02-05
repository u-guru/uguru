angular.module('uguru.user', [])
.factory('User', ['$localstorage', 'Restangular', function($localstorage, Restangular) {
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


    var initUser = function(properties) {
        var user = {};
        properties = [
            'name', 'email', 'last_position', 'deactivated',
            'university', 'university_id', 'onboarding', 'current_device'
        ]
        one_to_many_properties = [
            'all_positions', 'active_sessions', 'student_sessions',
            'guru_sessions', 'conversations', 'devices', 'gurus',
            'cards', 'requests', 'student_ratings', 'guru_ratings',
            'student_courses'
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
                .one('users')
                .customPOST(JSON.stringify(user));
        },
        update: function(user) {
            console.log('user saved remotely!');
           return Restangular
                .one('users')
                .customPUT(JSON.stringify(user));
        },
        updateLocal: function(user) {
           console.log('user saved locally!');
           $localstorage.setObject('user', user);
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