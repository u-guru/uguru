source ~/.bash_profile
echo "Removing android & ios..."
cordova platform rm android
cordova platform rm ios
echo "Removing facebook connect plugin"
cordova plugins rm com.phonegap.plugins.facebookconnect
echo "Add android & ios..."
cordova platform add android
cordova platform add ios
echo "Android/iOS added successfully"
echo "Re-adding facebook connect url"
cordova -d plugin add ~/Git/packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
echo "iOS complete"
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

cordova build android
ionic run android -clr --device