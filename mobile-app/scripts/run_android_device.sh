source ~/.bash_profile
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"
echo "Removing android"
cordova platform rm android
echo "Removing facebook connect plugin"
cordova plugin rm com.phonegap.plugins.facebookconnect
cordova plugins rm org.apache.cordova.file-transfer
cordova plugins rm org.apache.cordova.file
echo
echo "Remove cordova push plugin"
# cordova plugin rm com.phonegap.plugins.PushPlugin
# echo 'Creating local'
echo
echo "Adding Android platform"
cordova platform add android
echo "Re-adding facebook connect url"
cordova -d plugin add ./plugins_stable/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
cordova -d plugin add ./plugins_stable/org.apache.cordova.file
cordova -d plugin add ./plugins_stable/org.apache.cordova.file-transfer
echo
echo "Adding extra support for android..."
android update project --subprojects --path "platforms/android" --target android-19 --library "CordovaLib"
android update project --subprojects --path "platforms/android" --target android-19 --library "com.phonegap.plugins.facebookconnect/Uguru-FacebookLib"
echo
cd platforms/android
echo
cp local.properties com.phonegap.plugins.facebookconnect/FacebookLib
cd ../../
# echo "Adding push plugin "
echo ""
# cordova plugin add https://github.com/phonegap-build/PushPlugin.git
# echo
# mkdir com.phonegap.plugins.facebookconnect/FacebookLib/ant-build
# cd com.phonegap.plugins.facebookconnect/FacebookLib
# mkdir ant-build
# ant release
# ant clean

cordova build android --release
# cordova run android -clr --device

# ignore the warning that says: Warning: This jar contains entries whose certificate chain is not validated.
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore uguru.keystore ./platforms/android/ant-build/CordovaApp-release-unsigned.apk uguru


# this throws an error if it tries to look for the zipalign.exe in different android build tools path. just find
# where it is and copy it into the folder that it was supposrted to be in
zipalign -v 4 ./platforms/android/ant-build/CordovaApp-release-unsigned.apk ./platforms/android/ant-build/uguru.apk



# automating to play store:
# https://github.com/googlesamples/android-play-publisher-api/tree/master/v2/python
# https://developers.google.com/android-publisher/api-ref/
# sudo pip install --upgrade google-api-python-client









