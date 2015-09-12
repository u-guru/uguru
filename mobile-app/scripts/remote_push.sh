source ~/.bash_profile
echo "Clearing iOS xCode cache..."
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"
echo 'cd to uguru-mobile repository'
### TODO: RAISE if um is not defined
um && echo
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
echo 'cd to uguru-web'
cd ..
echo 'copying new files from uguru-mobile'
cp -r mobile-app/www/remote/* app/static/remote/
echo 'updating ios plugins'
# cp mobile-app/platforms/ios/www/cordova.js app/static/remote/ios.cordova.js && cp mobile-app/platforms/ios/www/cordova_plugins.js app/static/remote/ios.cordova_plugins.js
# cp -r mobile-app/platforms/ios/www/plugins/ app/static/remote/plugins/ && cp -r mobile-app/www/remote/* app/static/remote/
echo 'copying ios.css, windows, android file into the root remote'
echo 'calling git add -A .'
git add -A .
git commit -m "{$msg}"
echo
echo
echo 'pushing to git, to the master branch'
echo
echo
git push origin master
echo
echo
echo 'pushing to heroku, to the master branch'
echo
echo
git push rest staging:master
echo
echo
echo 'last part: restarting servers & updating database'
echo
echo
honcho run python manage.py update
heroku run honcho run python manage.py update --app uguru-rest
heroku run honcho run python manage.py init_test_devices --app uguru-rest
# heroku restart --app uguru-rest
# heroku run honcho run python manage.py init_admin --app uguru-rest
