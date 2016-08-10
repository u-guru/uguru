angular
	.module('uguru.util.controllers')
	.factory('AccessService', [
		'$localstorage',
		'University',
		'User',
		'DeviceService',
		'LoadingService',
		AccessService
		]);

function AccessService($localstorage, University, User, DeviceService, LoadingService) {

	var genericAccessCode = 'cool';
	var universityAccessCodes = University.getTargettedAccessCodes();
	var accessInput;
	return {
		validate: validate,
		accessInput: accessInput
	}

	function isMascotCode(code) {
		return universityAccessCodes.indexOf(code) > -1;
	}

	function validate(code, success_func, fail_func) {
		if(code !== undefined) {
			if (mixpanel && mixpanel.track) {
				mixpanel.track(
			    	"Access attempt",
			    	{"code": code}
				);
			}

			payload = {
				access_code: code
			}

			User.checkAccess(payload).then(function(data) {
				var data = data.plain()
				if (success_func) {
					if (DeviceService.isAndroidDevice()) {
						LoadingService.showMsg('Sorry! You will need another access code for the mobile apps. Please contact support@uguru.me with your access code included', 5000);
					} else {
						success_func()
					}
				}

			}, function(err) {
				if (err.status === 401) {
					fail_func();
				} else {
					fail_func();
				}
			})

			// if(code===genericAccessCode || isMascotCode(code)) {
			// 	if (!LOCAL) {
			// 		$localstorage.set("access", true);
			// 		$localstorage.set("accessAdmin", true);
			// 	} else {

			// 	}
			// 	return true;
			// } else return false;

		} else {
			var storedAccess = JSON.parse($localstorage.get("access", "false"));

			if (fail_func) {
				fail_func();
			}

			return storedAccess;
		}

	}

}