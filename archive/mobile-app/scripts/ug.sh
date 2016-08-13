# BEFORE RUNNING ANYTHING MAKE SURE TO HAVE CORDOVA 5.0.0 INSTALLED. 
# WE WILL USE THIS VERSION FOR BOTH ANDROID AND IOS.
# npm uninstall -g cordova
# npm install -g cordova@5.0.0


# for production notes:
# change gulpfile, local set to false, config.xml src to index.html


ug() {
	printf '\n'
	printf '\e[0;36m Available Commands \e[0m\n'
	printf '\n'
	printf '\t build <android|ios> \t\t Installs the specified platform along with required plugins.\n'
	printf '\n'
	printf '\n'
	printf '\t run <android|ios> \t\t Runs livereload along with optional argument for starting page. Requires build <android|ios> before running.\n'
	printf '\n'
	printf '\n'
	printf '\t release <android|ios> \t\t Generates production-ready builds.  Currently Android only.  The Android process will automate through to the final signed and zipped apks.  Whereas current IOS process will end on xCode opening for user input. \n'
	printf '\n'
	printf '\n'
	printf '\t push \t\t Compile and generate production both Android/Ios\n'
	printf '\n'

}


build-android() {

	cordova platform rm ios
	cordova platform rm android
	rm -rf plugins/*
	cp -R plugins_android/general/. plugins/
	cordova platform add android@4.1
	cordova plugin add ./plugins_android/specific/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"	
	cordova build android
}

# jarsigner -verify -verbose -certs ./platforms/android/build/outputs/apk/android-x86-release-unsigned.apk
release-android() {
	build-android
	cordova build android --release
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore uguru.keystore ./platforms/android/build/outputs/apk/android-x86-release-unsigned.apk uguru
	zipalign -v 4 ./platforms/android/build/outputs/apk/android-x86-release-unsigned.apk ./platforms/android/build/outputs/apk/uguru-x86.apk

	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore uguru.keystore ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk uguru
	zipalign -v 4 ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk ./platforms/android/build/outputs/apk/uguru-x86.apk
	printf '\e[0;36m Okay to ignore warning about several entries not being validated. \e[0m\n'
	printf '\e[0;36m Crosswalk builds out two separate apks for devices that use either x86 or armv7 processors for compatibility with all devices. \e[0m\n'
	printf '\e[0;36m Be sure to submit both apks to the play store! \e[0m\n'
}


build-ios() {

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
}

release-ios() {
	build-ios
}

push-production() {
	build-android
	release-android
	# ============================================

	# Insert Google Publisher API here

	# ============================================

	build-ios


}




