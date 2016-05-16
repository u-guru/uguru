### pp=prepare_production
### up=update_production
### fp=force_production
### lp=local_production
### sp=staging_production
### ps=prepare_staging
### us=update_staging
### rid=run_ios_device
### rad=run_android_device
### ridl=run_ios_device_reload
### radl=run_android_device_reload

# source ~/.bash_profile
echo "Clearing iOS xCode cache..."
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"
echo 'cd to uguru-mobile repository'
um
echo '================'
echo '=============='
echo '==========='
echo
echo 'compressing ..... ..... .... .    ....'
echo
echo 'compressing ..... ..... .... .    ...'
echo
echo 'compressing ..... ..... .... .    ..'
echo
echo 'compressing ..... ..... .... .    .'
echo
echo 'compressing ..... ..... .... .    '
echo
echo 'compressing ..... ..... .... .    .'
echo
echo 'compressing ..... ..... .... .    ..'
echo
echo 'compressing ..... ..... .... .    ...'
echo
echo 'compressing ..... ..... .... .    ....'
echo
echo 'minifying + compressing local assets..'

gulp -b
echo 'compiling all local assets..'
cp dest/scripts/app.js www/remote/js/app.js && cp dest/styles/*.css www/remote/css/app_version.css
cp dest/scripts/templates.js www/remote/js/templates.js
echo 'cd to uguru-web'
cd ..
echo 'copying new files from uguru-mobile'
cp -r mobile-app/www/remote/* app/static/remote/
cp -r mobile-app/dest/templates/* app/static/remote/templates/

echo 'updating ios plugins'
# cp mobile-app/platforms/ios/www/cordova.js app/static/remote/ios.cordova.js && cp mobile-app/platforms/ios/www/cordova_plugins.js app/static/remote/ios.cordova_plugins.js
echo
echo
echo
echo
echo
echo 'Try opening localhost:5000/static/remote/index.html'
echo
echo
echo
echo
echo 'jk -- we can do that for you too ;)'
echo
echo
echo
# open 'http://localhost:5000/#/'
