 source ~/.bash_profile
echo "Clearing iOS xCode cache..."
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"
echo "Removing ios & android"
cordova platform rm android
cordova platform rm ios
echo "Removingf facebook connect plugin"
cordova plugin rm com.phonegap.plugins.facebookconnect
echo "Adding both ios and android"
cordova platform add ios
cordova platform add android
echo "Re-adding facebook connect url"
cordova -d plugin add ~/Git/packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
cordova build ios
echo "Ios build complete!"
echo
echo
echo "Adding extra support for android..."
android update project --subprojects --path "platforms/android" --target android-19 --library "CordovaLib"
android update project --subprojects --path "platforms/android" --target android-19 --library "com.phonegap.plugins.facebookconnect/Uguru-FacebookLib"
cd platforms/android/
cp local.properties com.phonegap.plugins.facebookconnect/Uguru-FacebookLib
ant clean
# mkdir com.phonegap.plugins.facebookconnect/Uguru-FacebookLib/ant-build
cd com.phonegap.plugins.facebookconnect/Uguru-FacebookLib
mkdir ant-build
ant clean
ant release
cd ../../../..
cordova prepare android
cordova build android
echo "Adding extra support for android..."