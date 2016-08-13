alias uw="cd ~/Git/uguru"
alias um="cd ~/Git/uguru/mobile-app"
alias s="subl"
alias ba="um && sh scripts/android_build.sh"
# E2E
alias rp="protractor e2e_test/config/protractor.config.js"
alias po="protractor e2e_test/config/onboarding.config.js"
alias pe="protractor e2e_test/config/email.config.js"
alias pf="protractor e2e_test/config/facebook.config.js"
alias pgp="protractor e2e_test/config/guruProf.config.js"
alias pr="protractor e2e_test/config/ranking.config.js"
alias pw="protractor e2e_test/config/workflow.config.js"
alias pc="protractor e2e_test/config/course.config.js"
alias pe="protractor e2e_test/config/error.config.js"
alias pre="protractor e2e_test/config/request.config.js"
alias pweb="protractor e2e_test/config/web.config.js"
alias pm="protractor e2e_test/config/mobile.config.js"
#alias run_all="protractor e2e_test/config/mobile.config.js --suite=access,university,major,course,category,photo"

defaults() { 
#/path/to/bar "$@" fixed args; 
  protractor e2e_test/config/mobile.config.js --suite=major,course,category,photo
 }
alias 'run_all'= defaults() 
#--params.screenSize.w 800 --params.screeSize.h 800

#pm   --suite=major,course,category,photo





alias rph="protractor e2e_test/config/protractor.config.headless.js"
alias ws="webdriver-manager start"
alias wu="webdriver-manager update"
export ANDROID_HOME=/home/twfob/dev/android-sdk-linux
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

#export PATH=${PATH}:~/android-sdk-linux/tools
#export PATH=${PATH}:~/android-sdk-linux/platform-tools

export ANDROID_HOME=/usr/local/Cellar/android-sdk/24.3.4/
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

NPM_PACKAGES="${HOME}/.npm-packages"
PATH="$NPM_PACKAGES/bin:$PATH"
# Unset manpath so we can inherit from /etc/manpath via the `manpath`
# command
unset MANPATH # delete if you already modified MANPATH elsewhere in your config
MANPATH="$NPM_PACKAGES/share/man:$(manpath)"
ANDROID_HOME=~/dev/android-sdk-linux
NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"

#export PATH=${PATH}:~/w-dev/android-sdk-linux/tools
#export PATH=${PATH}:~/w-dev/android-sdk-linux/platform-tools
#ANDROID_HOME=~/w-dev/android-sdk-linux
