#### make sure the following ####
##
### 1. Local = is true, same as network ifconfig
##
### 2. rest_url = either network ip or local ip
##
### 3. Gulp build
echo "Clearing iOS xCode cache..."
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"
echo 'running ios on local device...'
echo 'minifying + compressing local assets..'
gulp -b
echo 'compiling all local assets..'
cp dest/scripts/*.js www/remote/js/app.js && cp dest/styles/*.css www/remote/css/app_version.css
echo 'running ios'
ionic run ios -clr