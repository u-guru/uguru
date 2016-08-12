source ~/.bash_profile
echo "Removing android & ios..."
cordova platform rm ios
echo "Removing facebook connect plugin"
cordova plugins rm com.phonegap.plugins.facebookconnect
echo "Add android & ios..."
cordova platform add ios
echo "IOS Platform added successfully"
echo
echo "Re-adding facebook connect url"
echo
cordova -d plugin add ~/Git/packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
echo
echo 'Building device version for ios'
ionic build ios
echo
echo 'Running on device... please make sure your device is plugged in'
ionic run ios -clr --device
echo
echo
echo 'Youre all set!'
