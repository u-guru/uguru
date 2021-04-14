Uguru Mobile
============

**Setup**

- % brew install npm
- % npm install gulp gulp util --save
- % npm install -g cordova ionic
- % npm install -g

**Run on Web**

- % >> ionic serve -clr
- % http://localhost:8100/remote

**Run on Android live-reload device (first time) **
- % NOTE: Make sure android is setup. Make sure by typing android in your terminal and seeing if returns familiarity
- % source ~/.bash_profile
- % cordova platform rm android
- % cordova plugins rm com.phonegap.plugins.facebookconnect
- % cordova platform add android
- % cordova -d plugin add packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
- % android update project --subprojects --path "platforms/android" --target android-19 --library "CordovaLib"
- % android update project --subprojects --path "platforms/android" --target android-19 --library "com.phonegap.plugins.facebookconnect/Uguru-FacebookLib"
- % cd platforms/android/
- % cp local.properties com.phonegap.plugins.facebookconnect/Uguru-FacebookLib
- % ant clean
- % mkdir com.phonegap.plugins.facebookconnect/Uguru-FacebookLib/ant-build
- % cd com.phonegap.plugins.facebookconnect/Uguru-FacebookLib
- % mkdir ant-build
- % ant clean
- % ant release
- % cd ../../../.. # should takes you back to uguru/mobile-app
- % cordova prepare android
- % cordova build android
- % cordova run android -clr ## MAKE SURE DEVICE IS PLUGGED IN

**Android SDK setup**
-- Install Java 7 SDK : http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html
- % brew install ant
- % brew install android-sdk

Source this in your .bash_profile or .zshrc:

export ANDROID_HOME=/usr/local/opt/android-sdk

- % android (*A window will open asking what to install. Choose API 19*)
- % android avd (*this will launch a window in which you create a virtual device to emulate*)
- % ionic run android (*the "run" command uses Genymotion, a much faster Android emulator.*)

======LESS IMPORTANT STUFF BELOW=======



**Github Best Practices (DO THESE IN THIS ORDER!!)**
- Add your files!
    - % git add -A .
- Commit your files w/ relevant message
    - % git commit -m '{{RELEVANT MESSAGE HERE}}'
- Pull the most up-to-date codebase
    - % git pull origin uguru-all-local
- Check the terminal output for merge issues. If there are, please add + commit.
    - % git add -A .
    - % git commit -m 'fixed merge conflicts.'
- Push to the live server
    - % git push origin jason

**Adding Cordova/Phonegap Plugins**

- % cordova -d plugin add ~/Git/packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"


*iOS Build*

-- Make sure you have the newest xcode and commandline tools

- % npm install -g ios-sim
- % ionic build ios
- % ionic emulate ios (*in simulator*)

*iOS Build*
- Build & Archive new project via XCODE
- Submit it right away via hockey app

*Publish Android App to HockeyApp*

Prerequisites
- Make sure 'www/js/main.js' does not point to local server

- % Change version number in ./config.xml to +0.0.1
- % 'cordova build --release android' in root project directory
- % cd into 'platforms/android/ant-build/'

First-time-only
- % Generate a keystore 'keytool -genkey -v -keystore uguru.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000'


- Sign this key "jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore uguru.keystore CordovaApp-release-unsigned.apk alias_name"
- Create new APK version with zip align: "~/Development/android-sdk-macosx/build-tools/19.1.0/zipalign -v 4 CordovaApp-release-unsigned.apk Uguru-android-1.2.X.apk"
- Upload APK to hockeyapp


**Switching from production to local**
- config.xml --> index.html to remote/local.index.html
- main.js --> LOCAL = true,
- BASE_URL --> 'http://192.168.42.66:8100'
- REST_URL --> 'http://192.168.42.66:5000'
- re-build everything
- ionic serve

**Switching to local production test-mode**
- config.xml --> remote/local.index.html to index.html
- main.js --> LOCAL = false,
- BASE_URL --> 'http://192.168.42.66:5000/production/'
- REST_URL --> 'u.uguru.me'
- rebuild everything
- ionic serve

**Table**

==Local==
- - - - - - - - - -
Explaination

config.xml -> local.index.html -> remote/main.js
ionic serve -l | local = true | config.xml = remote.local.index


==local-production==

==setup
main.js: [local = false], [rest_url = 'localhost:5000', base_url = 'localhost:5000/app/static/production']

ionic platform rm ios
change config.xml [remote/local.index.html -> index.html]
build new ionic project [bir]
update uguru-web with the most recent main.js [gulp compile bir]
- - - - - - - - - -

==production==

==setup
main.js: [local = false], [rest_url = 'localhost:5000', base_url = 'localhost:5000/app/static/production']

ionic platform rm ios
change config.xml [remote/local.index.html -> index.html]
build new ionic project [bir]
update uguru-web with the most recent main.js [gulp compile bir]

**Cleanup TODO**
- Cleanup www/ directory (not impt now, www/remote more important)
- Organize www/remote/img (complete clusterfuck)
- [Later] Delete/organize remainder unnecessary files in  www/remote/controllers/*/.js. ** I need now for reference
-


