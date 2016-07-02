#!/bin/bash
if [ $# == 0 ];
	then
	printf "\e[0;36m\n"
	printf "ug build <android|ios> : Installs the specified platform along with required plugins.\n"
	printf "\e[0m\n"
fi


if [ $# == 1 ];
	then platform="$1";
	printf "\n"
	printf "\e[0;36mPassed into ug_build.sh: $platform \e[0m\n"
	printf "\n"

	if [ $platform == 'all' ]; then
		printf "\e[0;36mBuilding for $platform \e[0m\n"
		cordova platform rm ios
		cordova platform rm android
		cordova platform rm wp8

		rm -rf plugins/com.phonegap.plugins.facebookconnect
		rm -rf plugins/*



		cordova plugin add ionic-plugin-keyboard
		cordova plugin add cordova-plugin-camera@1.2.0
		cordova plugin add https://bitbucket.org/uguru-nick/crosswalk-plugin

		cordova plugin add cordova-plugin-device
		cordova plugin add cordova-plugin-dialogs
		cordova plugin add cordova-plugin-inappbrowser
		cordova plugin add cordova-plugin-network-information
		cordova plugin add cordova-plugin-statusbar
		cordova plugin add cordova-plugin-whitelist
		cordova plugin add cordova-plugin-file@1.3.3
		cordova plugin add cordova-plugin-file-transfer@0.5.0
		cordova plugin add cordova-plugin-geolocation@1.0.1
		cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git

		cordova platform add android@4.1
		printf "\e[0;36mCopying over build-extras.gradle... \e[0m\n"
		cp ./build_settings_android/build-extras.gradle platforms/android/
		cordova build android -- --gradleArg=-q
		printf "\e[0;36mCopying over MainActivity.java... \e[0m\n"
		cp ./build_settings_android/MainActivity.java platforms/android/src/com/beta/college/Uguru/
		printf "\e[0;36mFinished building. \e[0m\n"
		
		cordova platform add ios@3.8

		# printf "\e[0;36mSetting up compatibility for the Facebook and Push plugins... \e[0m\n"

		# cordova plugin add https://github.com/phonegap/phonegap-plugin-push
		# cordova plugin add https://bitbucket.org/uguru-nick/phonegap-facebook-plugin --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
		# cordova plugin add https://github.com/Telerik-Verified-Plugins/AppleWatch
		printf '\n'
		printf '\e[0;36mOpening xCode project and giving back control... \e[0m\n'
		printf '\e[0;36mMake sure to follow the steps below in order for the app to compile correctly. \e[0m\n'
		printf '\e[0;36mNavigate to the Capabilities tab and turn on Push Notifications. \e[0m\n'
		printf '\e[0;36mFor xCode 7+: Make sure to disable "ENABLE_BITCODE" in build settings. \e[0m\n'
		printf '\e[0;36mSet the correct signing identity and build with xCode. \e[0m\n'
		printf "\e[0;36mIf using Nick's account then set bundle ID to: com.beta.college.Uguru \e[0m\n"
		open ./platforms/ios/Uguru.xcodeproj
	fi
	if [ $platform == 'android' ]; then
		printf "\e[0;36mBuilding for $platform \e[0m\n"
		cordova platform rm ios
		cordova platform rm android

		rm -rf plugins/com.phonegap.plugins.facebookconnect
		rm -rf plugins/*
		# cp -f ./build_settings_universal/config.xml ./
		# cp -f ./build_settings_universal/constants.js ./www/js/
		# cp -f ./build_settings_universal/constants.js ./www/remote/js/

		cordova plugin add ionic-plugin-keyboard
		cordova plugin add cordova-plugin-camera@1.2.0
		cordova plugin add https://bitbucket.org/uguru-nick/crosswalk-plugin

		cordova plugin add ionic-plugin-keyboard
		cordova plugin add cordova-plugin-camera
		cordova plugin add cordova-plugin-device
		cordova plugin add cordova-plugin-dialogs
		cordova plugin add cordova-plugin-inappbrowser
		cordova plugin add cordova-plugin-network-information
		cordova plugin add cordova-plugin-statusbar
		cordova plugin add cordova-plugin-file@1.3.3
		cordova plugin add cordova-plugin-file-transfer@0.5.0
		cordova plugin add cordova-plugin-geolocation
		cordova plugin add cordova-plugin-splashscreen@1.0.0
		# # cordova plugin add cordova-plugin-media
		# # cordova plugin add cordova-plugin-keepe-cardio
		# # cordova plugin add cordova-plugin-x-socialsharing
		# # cordova plugin add cordova-plugin-calendar
		# # cordova plugin add cordova-plugin-appavailability
		# # cordova plugin add cordova-plugin-x-toast
		# # cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyB_voN6xxmCRcnalAW9IMjnfluJgM6BuJU" --variable API_KEY_FOR_IOS="AIzaSyCxaNq1wuWUE9dsq66uixM-Z49FYZzDctA"
		# cordova plugin add cordova-plugin-media
		# cordova plugin add cordova-plugin-keepe-cardio
		# cordova plugin add cordova-plugin-x-socialsharing
		# cordova plugin add cordova-plugin-calendar
		# cordova plugin add cordova-plugin-appavailability
		# cordova plugin add cordova-plugin-x-toast

		# cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyB_voN6xxmCRcnalAW9IMjnfluJgM6BuJU" --variable API_KEY_FOR_IOS="AIzaSyCxaNq1wuWUE9dsq66uixM-Z49FYZzDctA"
		cordova platform add android@4.1
		# printf "\e[0;36mInstalling and configuring the Android Support Libray v13 for Facebook and Push plugins... \e[0m\n"
		# cordova plugin add https://bitbucket.org/uguru-nick/phonegap-facebook-plugin --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
		printf "\e[0;36mCopying over build-extras.gradle... \e[0m\n"
		cp ./build_settings_android/build-extras.gradle platforms/android/
		cordova build android -- --gradleArg=-q
		printf "\e[0;36mCopying over MainActivity.java... \e[0m\n"
		cp ./build_settings_android/MainActivity.java platforms/android/src/com/beta/college/Uguru/
		printf "\e[0;36mFinished building. \e[0m\n"
	fi

	if [ $platform == "ios" ]; then
		printf "\e[0;36mBuilding for $platform \e[0m\n"
		cordova platform rm android
		cordova platform rm ios
		cordova platform rm wp8
		rm -rf plugins/*
		# cp -f ./build_settings_universal/config.xml ./
		# cp -f ./build_settings_universal/constants.js ./www/js/
		# cp -f ./build_settings_universal/constants.js ./www/remote/js/

		cordova plugin add ionic-plugin-keyboard
		cordova plugin add cordova-plugin-camera
		cordova plugin add cordova-plugin-device
		cordova plugin add cordova-plugin-dialogs
		cordova plugin add cordova-plugin-inappbrowser
		cordova plugin add cordova-plugin-network-information
		cordova plugin add cordova-plugin-statusbar
		cordova plugin add cordova-plugin-file@1.3.3
		cordova plugin add cordova-plugin-file-transfer@0.5.0
		cordova plugin add cordova-plugin-geolocation
		cordova plugin add cordova-plugin-splashscreen@1.0.0
		cordova plugin add cordova-plugin-media
		cordova plugin add cordova-plugin-keepe-cardio
		cordova plugin add cordova-plugin-x-socialsharing
		cordova plugin add cordova-plugin-calendar
		cordova plugin add cordova-plugin-appavailability
		cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyB_voN6xxmCRcnalAW9IMjnfluJgM6BuJU" --variable API_KEY_FOR_IOS="AIzaSyCxaNq1wuWUE9dsq66uixM-Z49FYZzDctA"
		cordova plugin add cordova-plugin-x-toast
		cordova plugin add https://github.com/katzer/cordova-plugin-badge

		cordova platform add ios@3.8

		printf "\e[0;36mSetting up compatibility for the Facebook and Push plugins... \e[0m\n"

		cordova plugin add https://github.com/phonegap/phonegap-plugin-push
		cordova plugin add https://bitbucket.org/uguru-nick/phonegap-facebook-plugin --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
		# cordova plugin add https://github.com/Telerik-Verified-Plugins/AppleWatch
		printf '\n'
		printf '\e[0;36mOpening xCode project and giving back control... \e[0m\n'
		printf '\e[0;36mMake sure to follow the steps below in order for the app to compile correctly. \e[0m\n'
		printf '\e[0;36mNavigate to the Capabilities tab and turn on Push Notifications. \e[0m\n'
		printf '\e[0;36mFor xCode 7+: Make sure to disable "ENABLE_BITCODE" in build settings. \e[0m\n'
		printf '\e[0;36mSet the correct signing identity and build with xCode. \e[0m\n'
		printf "\e[0;36mIf using Nick's account then set bundle ID to: com.beta.college.Uguru \e[0m\n"
		open ./platforms/ios/Uguru.xcodeproj
	fi

fi




