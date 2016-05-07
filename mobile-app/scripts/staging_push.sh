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
echo 'Please type in a commit message:'
echo
echo '>>>'
echo
read msg
echo
echo 'What branch are you on?'
read branch
echo 'saving.....'
echo
echo 'saving....'
echo
echo 'saving...'
echo
echo 'saving..'
echo
echo 'saving.'
echo
echo 'saving..'
echo
echo 'saving...'
echo
echo 'saving....'
echo
echo 'saving.....'
echo
echo 'minifying + compressing local assets..'

gulp -b
echo 'compiling all local assets..'
cp dest/scripts/*.js www/remote/js/app.js && cp dest/styles/*.css www/remote/css/app_version.css
cp dest/scripts/templates.js www/remote/js/templates.js
echo 'cd to uguru-web'
cd ..
echo 'copying new files from uguru-mobile'
cp -r mobile-app/www/remote/* app/static/remote/
echo 'updating ios plugins'
# cp mobile-app/platforms/ios/www/cordova.js app/static/remote/ios.cordova.js && cp mobile-app/platforms/ios/www/cordova_plugins.js app/static/remote/ios.cordova_plugins.js
echo 'copying ios.css, windows, android file into the root remote'
echo 'calling git add -A .'
git add -A .
git commit -m "{$msg}"
echo
echo
echo 'pushing to git, to the staging branch'
echo
echo
git push origin $branch:$branch
echo
echo 'pushing to staging servers, to the master branch'
echo
echo
git push staging $branch:master
echo
echo
echo 'last part: restarting servers & updating database'
echo
echo
# heroku run honcho run python manage.py init_test_devices --app uguru-rest
# heroku restart --app uguru-rest
# heroku run honcho run python manage.py init_admin --app uguru-rest
