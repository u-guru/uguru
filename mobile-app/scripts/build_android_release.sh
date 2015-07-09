## 0. Make sure views.py /app/ is set to production url as well
## 1. make sure remote is set to false
## 2  make sure production is set to production urls
## 3. Compile the local assets
## 4. Copy them to the right directory
## 5. Test by running honcho local with /app/ and going to /remote/app/

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
# cp -r ~/Git/uguru/uguru-mobile/platforms/android/assets/www/plugins/ app/static/remote/plugins/ && cp -r ~/Git/uguru/uguru-mobile/www/remote/* app/static/remote/ && cp ~/Git/uguru/uguru-mobile/platforms/android/assets/www/cordova.js app/static/remote/android.cordova.js && cp ~/Git/uguru/uguru-mobile/platforms/android/assets/www/cordova_plugins.js app/static/remote/android.cordova_plugins.js
echo 'copying android.css file into the root remote'
cp ~/Git/uguru/uguru-mobile/www/remote/css/android.css app/static/remote/
echo 'submit to git'
git add -A .
echo 'git files added'
echo 'commit your message!'