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
cordova -d plugin add ~/Git/packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
cordova plugin add org.apache.cordova.file@r1.3.3
cordova plugin add org.apache.cordova.file-transfer@r0.5.0

echo
echo 'Building device version for ios'
ionic run ios -clr
echo
# echo 'Running on device... please make sure your device is plugged in'
# ionic run ios -clr --device
echo
echo 'Youre all set!'
