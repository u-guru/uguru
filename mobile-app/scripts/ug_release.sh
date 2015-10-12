
if [ $# == 0 ];
	then 
	printf "\e[0;36m\n"
	printf 'ug release <android|ios> : Compiles production-ready builds. \n'
	printf "Only the Android process will automate through to the final signed and zipped apks.  Whereas current IOS process will end on xCode opening for user input. \n"
	printf "\e[0m\n"
fi


if [ $# == 1 ];
	then platform="$1";
	printf "\n"
	printf "\e[0;36m Passed into ug_release.sh: $platform \e[0m\n"
	printf "\n"

	if [ $platform == 'android' ]; then
		printf "\e[0;36mCompiling production apk for $platform \e[0m\n"

		./scripts/ug_build.sh $platform
		build-android
		cordova build android --release
		jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore uguru.keystore ./platforms/android/build/outputs/apk/android-x86-release-unsigned.apk uguru
		zipalign -v 4 ./platforms/android/build/outputs/apk/android-x86-release-unsigned.apk ./platforms/android/build/outputs/apk/uguru-x86.apk

		jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore uguru.keystore ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk uguru
		zipalign -v 4 ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk ./platforms/android/build/outputs/apk/uguru-x86.apk
		printf '\e[0;36mOkay to ignore warning about several entries not being validated. \n'
		printf ' Crosswalk builds out two separate apks for devices that use either x86 or armv7 processors for compatibility with all devices. \n'
		printf ' Be sure to submit both apks to the play store! \e[0m\n'
	fi

	if [ $platform == "ios" ]; then
		printf "\e[0;36mCompiling production app for $platform \e[0m\n"

		./scripts/ug_build.sh $platform


		cordova platform rm android
		cordova platform rm ios
		rm -rf plugins/*
		cp -R plugins_ios/general/. plugins/
		cordova platform add ios@3.8
		cordova plugin add ./plugins_ios/specific/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"	
		printf '\e[0;36mOpening xCode project and giving back control... \e[0m\n'
		printf '\e[0;36mMake sure to set the correct signing identity and build with xCode. \e[0m\n'
		printf '\e[0;36mFor xCode 7+: Make sure to disable "ENABLE_BITCODE" in build settings. \e[0m\n'
		open ./platforms/ios/Uguru.xcodeproj
	fi

fi



