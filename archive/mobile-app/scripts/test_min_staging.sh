echo 'cd to uguru-mobile repository'
um
echo 'cd to /remote/min'
cd www/remote/min/
echo 'compiling...'
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
gulp -b
echo 'copying all assets recursively'
cd ../../../../
ls
rm -rf app/static/remote/min/*
ls app/static/remote/min/
cp -rf mobile-app/www/remote/min/* app/static/remote/min/
rm -rf mobile-app/www/remote/min/dest/templates/*
echo 'opening...'
open 'http://localhost:5000'
echo 'pushing...'
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