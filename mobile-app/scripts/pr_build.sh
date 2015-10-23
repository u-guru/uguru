printf "\e[0;33mInstalling Cordova and Ionic for Protractor...\e[0m\n"

rm -rf plugins/*
rm -rf platforms/*

npm uninstall -g ionic
npm uninstall -g cordova

npm install -g cordova@4.3.1
npm install -g ionic@1.3.2

cordova plugin add https://github.com/driftyco/ionic-plugin-keyboard
cordova plugin add https://github.com/Uguru/org.apache.cordova.camera
cordova plugin add https://github.com/apache/cordova-plugin-device
cordova plugin add https://github.com/apache/cordova-plugin-dialogs
cordova plugin add https://github.com/apache/cordova-plugin-inappbrowser
cordova plugin add https://github.com/apache/cordova-plugin-network-information
cordova plugin add https://github.com/apache/cordova-plugin-statusbar
cordova plugin add https://github.com/Uguru/org.apache.cordova.file
cordova plugin add https://github.com/Uguru/org.apache.cordova.file-transfer
cordova plugin add https://github.com/apache/cordova-plugin-geolocation
cordova plugin add https://github.com/Uguru/org.apache.cordova.splashscreen
cordova plugin add https://github.com/apache/cordova-plugin-media
cordova plugin add https://github.com/vkeepe/card.io
cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
cordova plugin add https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin
cordova plugin add https://github.com/ohh2ahh/AppAvailability
cordova plugin add https://github.com/mapsplugin/cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyB_voN6xxmCRcnalAW9IMjnfluJgM6BuJU" --variable API_KEY_FOR_IOS="AIzaSyCxaNq1wuWUE9dsq66uixM-Z49FYZzDctA"
cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin
cordova plugin add https://github.com/Uguru/de.appplant.cordova.plugin.badge

cordova platform add android

printf "\e[0;33mInstalling and configuring the Android Support Libray v13 for Facebook and Push plugins... \e[0m\n"
cordova plugin add https://github.com/Uguru/phonegap-plugin-push
cordova plugin add https://github.com/Uguru/phonegap-facebook-plugin.git --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"

printf "\e[0;33mCoping over build-extras.gradle... \e[0m\n"
cp build-extras.gradle platforms/android/

cordova build android

printf "\e[0;33mFinished. If build was successful then proceed to calling ug run <platform>. \e[0m\n"