
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

	if [ $platform == 'android' ]; then
		printf "\e[0;36mBuilding for $platform \e[0m\n"
		# cordova platform rm ios
		cordova platform rm android
		rm -rf plugins/com.phonegap.plugins.facebookconnect
		rm -rf plugins/*
		# cp -R plugins_android/general/. plugins/

		cordova plugin add ionic-plugin-keyboard
		cordova plugin add https://github.com/Telerik-Verified-Plugins/NativePageTransitions
		cordova plugin add cordova-plugin-camera
		cordova plugin add cordova-plugin-crosswalk-webview
		cordova plugin add cordova-plugin-device
		cordova plugin add cordova-plugin-dialogs
		cordova plugin add cordova-plugin-inappbrowser
		cordova plugin add cordova-plugin-network-information
		cordova plugin add cordova-plugin-statusbar
		cordova plugin add cordova-plugin-whitelist
		cordova plugin add cordova-plugin-file@1.3.3
		cordova plugin add cordova-plugin-file-transfer@0.5.0
		cordova plugin add cordova-plugin-geolocation
		cordova plugin add cordova-plugin-splashscreen@1.0.0


		cordova platform add android@4.1
		cordova plugin add ~/Git/packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
		cordova build android

	fi

	if [ $platform == "ios" ]; then
		printf "\e[0;36mBuilding for $platform \e[0m\n"
		cordova platform rm android
		cordova platform rm ios
		rm -rf plugins/*
		# cp -R plugins_ios/general/. plugins/

		cordova plugin add ionic-plugin-keyboard
		cordova plugin add ~/Git/packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
		# cordova plugin add https://github.com/Telerik-Verified-Plugins/NativePageTransitions
		cordova plugin add cordova-plugin-camera
		cordova plugin add cordova-plugin-device
		cordova plugin add cordova-plugin-dialogs
		cordova plugin add cordova-plugin-inappbrowser
		cordova plugin add cordova-plugin-network-information
		cordova plugin add cordova-plugin-statusbar
		cordova plugin add cordova-plugin-whitelist
		cordova plugin add cordova-plugin-file@1.3.3
		cordova plugin add cordova-plugin-file-transfer@0.5.0
		cordova plugin add cordova-plugin-geolocation
		cordova plugin add cordova-plugin-splashscreen@1.0.0

		cordova platform add ios@3.8
		# NICK -- plz leave this here for me!
		cordova plugin add ~/Git/packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
		# cordova plugin add /Users/nlmac/Git/uguru/mobile-app/plugins_ios/specific/phonegap-facebook-plugin/ --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
		printf '\e[0;36mOpening xCode project and giving back control... \e[0m\n'
		printf '\e[0;36mMake sure to set the correct signing identity and build with xCode. \e[0m\n'
		printf '\e[0;36mFor xCode 7+: Make sure to disable "ENABLE_BITCODE" in build settings. \e[0m\n'
		open ./platforms/ios/Uguru.xcodeproj
	fi

fi




