
if [ $# == 0 ];
	then 
	printf "\e[0;36m\n"
	printf "ug build <android | ios> : Installs the specified platform along with required plugins.\n"
	printf "Please specify a platform. ug build <android | ios> \n"
	printf "\e[0m\n\n"
fi


if [ $# == 1 ];
	then platform="$1";
	printf "\n"
	printf "\e[0;36m Passed into ug_build.sh: $platform \e[0m\n"
	printf "\n"

	if [ $platform == 'android' ]; then
		printf "\e[0;36m Building for $platform \e[0m\n"
		cordova platform rm ios
		cordova platform rm android
		rm -rf plugins/*
		cp -R plugins_android/general/. plugins/
		cordova platform add android@4.1
		cordova plugin add ./plugins_android/specific/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"	
		cordova build android
		return
	fi

	if [ $platform == "ios" ]; then
		printf "\e[0;36m Building for $platform \e[0m\n"
		cordova platform rm android
		cordova platform rm ios
		rm -rf plugins/*
		cp -R plugins_ios/general/. plugins/
		cordova platform add ios@3.8
		cordova plugin add ./plugins_ios/specific/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"	
		printf '\e[0;36m Opening xCode project and giving back control... \e[0m\n'
		printf '\e[0;36m Make sure to set the correct signing identity and build with xCode. \e[0m\n'
		printf '\e[0;36m For xCode 7+: Make sure to disable "ENABLE_BITCODE" in build settings. \e[0m\n'
		open ./platforms/ios/Uguru.xcodeproj
	fi

fi

exit


