# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh
PATH=/usr/local/bin:$PATH
# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="robbyrussell"


# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to disable command auto-correction.
# DISABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(git)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/dsa_id"


export PATH=/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/sbin:/usr/sbin
[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function

# alias uw="~/Git/uguru/uguru-web && source .env"
# alias um="~/Git/uguru/uguru-mobile"

fpath=(/usr/local/share/zsh-completions $fpath)

export PATH="$HOME/.node/bin:$PATH"
export ANT_HOME=/Users/makhani/Documents/Utilities/apache-ant-1.8.4/
PATH=/Users/makhani/Documents/Utilities/apache-ant-1.8.4/bin:$PATH


export PATH=$HOME/local/bin:$PATH

export ANT_HOME="/Users/makhani/Desktop/apache-ant-1.8.2"

export PATH="$PATH:/Users/makhani/Desktop/apache-ant-1.8.2/bin"


export NVM_DIR="/Users/makhani/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

PATH="/Applications/Postgres.app/Contents/Versions/9.3/bin:$PATH"

alias uw="~/Git/uguru/uguru-web && source .env"
alias um="~/Git/uguru/uguru-web/mobile-app"
alias us="~/Git/uguru/uguru-scrape"
alias s="subl"
alias ba="um && sh scripts/android_build.sh"
alias rbi="um && ionic build ios"
alias bi="um && sh scripts/ios_build.sh"
alias ai="um && ionic platform rm ios && bi && bir"
alias bai="um && sh scripts/both_build.sh"
alias ri="um && scripts/run_ios_device.sh"
alias ra="um && scripts/run_android_device.sh"
alias rid="um && scripts/run_ios_device.sh"
alias rad="um && scripts/run_android_device.sh"
alias rp="um && scripts/remote_push.sh"
alias lp="um && scripts/local_push.sh"
alias ps="um && scripts/staging_push.sh"
alias ts="um && scripts/test_staging.sh"
alias tp="ts"
alias pp="rp"
alias id="ios-sim showdevicetypes"
alias sz="source ~/.zshrc"
alias lid="ionic run ios -clr --device"
alias li4="ionic emulate ios -clr --target='iPhone-4s'"
alias li5="ionic emulate ios -clr --target='iPhone-5s'"
alias li6="ionic emulate ios -clr --target='iPhone-5s'"
alias li6p="ionic emulate ios -clr --target='iPhone-6-Plus'"
### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"
export ANDROID_HOME=~/Development/android-sdk-macosx/
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
export PYTHONPATH=$PYTHONPATH:/usr/local/lib/python2.7/site-packages
export PATH="/opt/local/bin:/opt/local/sbin:$PATH"