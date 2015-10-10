source ~/.bash_profile
echo "Removing ios..."
cordova platform rm ios
echo "Removing facebook connect plugin"
cordova plugins rm com.phonegap.plugins.facebookconnect
cordova plugins rm org.apache.cordova.file
cordova plugins rm org.apache.cordova.file-transfer
cordova plugins rm cordova-plugin-crosswalk-webview
echo "Add ios..."
cordova platform add ios
echo "IOS Platform added successfully"
echo
echo "Re-adding facebook connect url"
echo
cordova -d plugin add ./plugins_stable/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
cordova -d plugin add ./plugins_stable/org.apache.cordova.file
cordova -d plugin add ./plugins_stable/org.apache.cordova.file-transfer

echo
echo 'Building device version for ios'
cordova build ios
echo
# echo 'Running on device... please make sure your device is plugged in'
# ionic run ios -clr --device
echo
echo 'Youre all set!'
