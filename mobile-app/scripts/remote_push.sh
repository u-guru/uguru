

echo "Clearing iOS xCode cache..."
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"
echo 'cd to uguru-mobile repository'
cd ~/Git/uguru/uguru-mobile
echo 'minifying + compressing local assets..'
gulp -b
echo 'compiling all local assets..'
cp dest/scripts/*.js www/remote/js/app.js && cp dest/styles/*.css www/remote/css/app_version.css
echo 'cd to uguru-web'
cd ~/Git/uguru/uguru-web
echo 'copying new files from uguru-mobile'
cp -r ~/Git/uguru/uguru-mobile/www/remote/* app/static/remote/
# cp -r ~/Git/uguru/uguru-mobile/platforms/ios/www/plugins/ app/static/remote/plugins/ && cp -r ~/Git/uguru/uguru-mobile/www/remote/* app/static/remote/ && cp ~/Git/uguru/uguru-mobile/platforms/ios/www/cordova.js app/static/remote/ios.cordova.js && cp ~/Git/uguru/uguru-mobile/platforms/ios/www/cordova_plugins.js app/static/remote/ios.cordova_plugins.js
echo 'copying ios.css file into the root remote'
cp ~/Git/uguru/uguru-mobile/www/remote/css/ios.css app/static/remote/
echo 'submit to git'
git add -A .
echo 'git files added'
git commit -m 'bug fixed'
echo 'commit your message!'
git push origin uguru-prod
git push rest uguru-prod:master
echo 'commit your message!'
honcho run python manage.py update
heroku run honcho run python manage.py update --app uguru-rest
heroku run honcho run python manage.py init_admin --app uguru-rest
heroku restart --app uguru-rest