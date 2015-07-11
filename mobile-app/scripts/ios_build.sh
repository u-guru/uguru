source ~/.bash_profile
echo "Clearing iOS xCode cache..."
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"
echo "Removing ios..."
cordova platform rm ios
echo "Removing facebook connect plugin"
cordova plugin rm com.phonegap.plugins.facebookconnect
echo "Add ios"
cordova platform add ios
echo "Re-adding facebook connect url"
cordova -d plugin add packages/phonegap-facebook-plugin-master --variable APP_ID="1416375518604557" --variable APP_NAME="Uguru"
echo "Ios added successfully"
cordova build ios
echo "Building ios... not release"