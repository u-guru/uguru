source ~/.bash_profile
echo "Removing android..."
cordova platform rm android
echo "Removing facebook connect android..."
cordova plugins rm com.phonegap.plugins.facebookconnect
echo "Add android..."
cordova platform add android
echo "Android added successfully"
echo "Re-adding facebook connect url"
cordova -d plugin add ~/Git/uguru/mobile-app/packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
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
# cordova run android -clr