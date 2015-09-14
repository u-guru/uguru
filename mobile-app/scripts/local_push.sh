### Setup require's these alias's
### uw --> uguru main repo
### um --> uguru/mobile-app
### app/static/local --> .gitignore
source ~/.bash_profile
source ~/.zshrc
uw
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"
echo 'cd to uguru-mobile repository'
### TODO: RAISE if um is not defined
um && echo
echo '================'
echo '=============='
echo '==========='
echo
echo '====SETUP====='
echo
echo '1. Verify www/remote/js/main.js has the following:'
echo '       ---> isAdmin = true'
echo '       ---> LOCAL_URL = http://192.168.42.XX:5000/app/local/'
echo
echo
echo '.'
echo '..'
echo '...'
echo '....'
echo '...'
echo '..'
echo '.'
echo
echo
echo 'compiling local device build....'
## create the admin build in remote/js/admin/temp.main.js admin
gulp uld
## create a copy of the OG main.js file before it's overriden
cp www/remote/js/main.js www/remote/js/admin/temp.main.js
cp www/remote/js/admin/main.js www/remote/js/main.js
echo
echo
echo '.'
echo '..'
echo '...'
echo '....'
echo '...'
echo '..'
echo '.'
echo
echo
echo 'compiling all local assets..'
echo
cd ..
mkdir app/static/local/
cp -r mobile-app/www/remote/* app/static/local/
echo
echo '.'
echo '..'
echo '...'
echo '....'
echo '...'
echo '..'
echo '.'
echo
echo 'Compiling and compressing the entire repo...'
cd mobile-app && gulp -b
cp dest/scripts/*.js ../app/static/local/js/app.js && cp dest/styles/*.css ../app/static/local/css/app_version.css
echo
echo
echo '.'
echo '..'
echo '...'
echo '....'
echo '...'
echo '..'
echo '.'
echo
echo
echo "Great! youre all set!"
echo "Feel free to commit if you would like"
## place the temp main to the original
cp www/remote/js/admin/temp.main.js www/remote/js/main.js
## delete everything that ever existed ;)
rm -rf www/remote/js/admin