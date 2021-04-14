# BEFORE RUNNING ANYTHING MAKE SURE TO HAVE CORDOVA 5.0.0 INSTALLED.
# WE WILL USE THIS VERSION FOR BOTH ANDROID AND IOS.
sudo npm uninstall -g cordova
sudo npm install -g cordova@5.0.0

# for production notes:
# change gulpfile, local set to false, config.xml src to index.html


# build-android() {

    cordova platform rm ios
    cordova platform rm android
    rm -rf plugins/*
    cp -R plugins_android/general/. plugins/
    cordova platform add android@4.1
    cordova plugin add ./plugins_android/specific/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
    cordova build android
# }


# run-android() {
    gulp replace --env=localdev --page=$1 --ip="$(ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}')"
    ionic run android -clr --device
# }


# release-android() {
#     build-android
#     cordova build android --release
#     jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore uguru.keystore ./platforms/android/build/outputs/apk/android-x86-release-unsigned.apk uguru
#     zipalign -v 4 ./platforms/android/build/outputs/apk/android-x86-release-unsigned.apk ./platforms/android/build/outputs/apk/uguru-x86.apk

#     jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore uguru.keystore ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk uguru
#     zipalign -v 4 ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk ./platforms/android/build/outputs/apk/uguru-x86.apk
#     printf '\e[0;36m Okay to ignore warning about several entries not being validated. \e[0m\n'
#     printf '\e[0;36m Crosswalk builds out two separate apks for devices that use either x86 or armv7 processors for compatibility with all devices. \e[0m\n'
#     printf '\e[0;36m Be sure to submit both apks to the play store! \e[0m\n'


    # ============================================

    # Insert Google Publisher API here

    # ============================================
}