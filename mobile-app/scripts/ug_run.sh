#!/bin/bash
if [ $# == 0 ];
	then
	printf "\e[0;36m\n"
	printf "ug run <android|ios> <optional startpage> : Runs livereload for the specified platform along with an optional argument for starting page.\n"
	printf "\e[0m\n"
fi


if [ $# -ge 1 ];
	then platform="$1";
	printf "\n"
	printf '\e[0;36mPlease make sure to call ug build <platform> before running this command. \n'
	printf 'Failure to do so will result in an unstable build. \n'
	printf "\n"

	if [ $# == 2 ];
		then startpage="$2"
	else startpage="university"
	fi
	printf "Setting startpage to: $startpage \n"

	if [ $platform == 'android' ]; then
		printf "Running for ${platform} \e[0m\n"

		# cp -f ./build_settings_universal/config.xml ./
		# cp -f ./build_settings_universal/constants.js ./www/js/
		# cp -f ./build_settings_universal/constants.js ./www/remote/js/
		# ./scripts/ug_build.sh android
		gulp replace --env=localdev --page=$startpage --ip="$(ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}')"
		ionic run android -clr --device -- --gradleArg=-q
	fi

	if [ $platform == "ios" ]; then
		printf "Running for ${platform} \e[0m\n"
		# ./scripts/ug_build.sh ios

		cp -f ./build_settings_universal/config.xml ./
		cp -f ./build_settings_universal/constants.js ./www/js/
		cp -f ./build_settings_universal/constants.js ./www/remote/js/
		gulp replace --env=localdev --page=$startpage --ip="$(ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}')"
		ionic run ios -clr --device
	fi

fi
