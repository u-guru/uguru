source ~/.bash_profile
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"
echo "Removing android"
ionic platform rm android
echo "Removingf facebook connect plugin"
ionic plugin rm com.phonegap.plugins.facebookconnect
echo
echo "Remove cordova push plugin"
# cordova plugin rm com.phonegap.plugins.PushPlugin
# echo 'Creating local'
echo
echo "Adding Android platform"
ionic platform add android
echo "Re-adding facebook connect url"
cordova -d plugin add ~/Git/packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
echo
echo "Adding extra support for android..."
android update project --subprojects --path "platforms/android" --target android-19 --library "CordovaLib"
android update project --subprojects --path "platforms/android" --target android-19 --library "com.phonegap.plugins.facebookconnect/Uguru-FacebookLib"
echo
cd platforms/android
echo
cp local.properties com.phonegap.plugins.facebookconnect/Uguru-FacebookLib
# echo "Adding push plugin "
echo ""
# cordova plugin add https://github.com/phonegap-build/PushPlugin.git
# echo
mkdir com.phonegap.plugins.facebookconnect/Uguru-FacebookLib/ant-build
cd com.phonegap.plugins.facebookconnect/Uguru-FacebookLib
mkdir ant-build
ant clean
ant release

ionic build android
ionic run android -clr --device