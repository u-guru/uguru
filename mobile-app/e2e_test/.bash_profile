
### all your alias's
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
alias pw="protractor e2e_test/config/workflow.config.js"


alias rph="protractor e2e_test/config/protractor.config.headless.js"
alias ws="webdriver-manager start"
alias wu="webdriver-manager update"

export PATH=${PATH}:~/dev/android-sdk-linux/tools
export PATH=${PATH}:~/dev/android-sdk-linux/platform-tools
ANDROID_HOME=~/dev/android-sdk-linux

#export PATH=${PATH}:~/w-dev/android-sdk-linux/tools
#export PATH=${PATH}:~/w-dev/android-sdk-linux/platform-tools
#ANDROID_HOME=~/w-dev/android-sdk-linux
