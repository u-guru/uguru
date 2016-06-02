echo 'cd to uguru-mobile repository'
um
echo 'cd to /remote/min'
cd www/remote/min/
echo 'compiling...'
gulp -b
echo 'copying all assets recursively'
cd ../../../../
ls
rm -rf app/static/remote/min/*
ls app/static/remote/min/
cp -rf mobile-app/www/remote/min/* app/static/remote/min/
echo 'opening...'
open 'http://localhost:5000/min/'
