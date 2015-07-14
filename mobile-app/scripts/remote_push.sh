echo "Clearing iOS xCode cache..."
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"
echo 'cd to uguru-mobile repository'
### TODO: RAISE if um is not defined
um
echo 'minifying + compressing local assets..'
gulp -b
echo 'compiling all local assets..'
cp dest/scripts/*.js www/remote/js/app.js && cp dest/styles/*.css www/remote/css/app_version.css
echo 'cd to uguru-web'
cd ..
echo 'copying new files from uguru-mobile'
cp -r mobile-app/www/remote/* app/static/remote/
echo 'updating ios plugins'
cp -r mobile-app/platforms/ios/www/plugins/ app/static/remote/plugins/ && cp -r mobile-app/www/remote/* app/static/remote/ && cp mobile-app/platforms/ios/www/cordova.js app/static/remote/ios.cordova.js && cp mobile-app/platforms/ios/www/cordova_plugins.js app/static/remote/ios.cordova_plugins.js
echo 'copying ios.css, windows, android file into the root remote'
cp mobile-app/www/remote/css/ios.css app/static/remote/
cp mobile-app/www/remote/css/android.css app/static/remote/
cp mobile-app/www/remote/windows.css app/static/remote/
echo 'calling git add -A .'
git add -A .
echo
echo 'Please type in a commit message:'
echo '>>>'
echo
read msg
echo
echo 'saving.....'
echo
echo 'saving....'
echo
echo 'saving...'
echo
echo 'saving..'
echo
echo 'saving.'
git commit -m "{$msg}"
echo 'commit successful'
