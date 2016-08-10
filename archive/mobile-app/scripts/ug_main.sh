#!/bin/bash

	# For optimal use, create a ug alias function in your bash profile and include the entire contents of this script.

		if [[ "$PWD" != *'mobile-app'* ]]; then
			printf "\e[0;31m"
			printf "Please ensure that you are in the /mobile-app/ directory.\n"
			printf "\e[0m"
			exit
	 	fi

		if [ "$1" == "start" ]; then
			printf "\e[0;36mEnabling user permissions...\n"
			if [ ! -f ./scripts/ug_help.sh ]; then
				printf "\e[0;31mERROR: Could not locate ug scripts.\n"
			    printf "Please ensure that you are in the /mobile-app/ directory."
			    printf "\e[0m"
			    exit
			fi
			chmod 777 ./scripts/ug_main.sh
			chmod 777 ./scripts/ug_help.sh
			chmod 777 ./scripts/ug_build.sh
			chmod 777 ./scripts/ug_run.sh
			chmod 777 ./scripts/ug_release.sh
			chmod 777 ./scripts/ug_push.sh
			chmod 777 ./scripts/ug_plugins.sh
			printf "\n"
			printf "You have successfully installed the ug command line interface. \n"
			printf "For a list of available commands please refer to the help option (ug help). \n"
			printf "\e[0m"
			exit
	    fi

	    if [ "$1" == "setup" ]; then
	    	printf "\e[0;36mInstalling Cordova and Ionic for production...\n"
	    	rm -rf plugins/*
			rm -rf platforms/*
	    	npm uninstall -g cordova
	    	npm uninstall -g ionic
	    	npm install -g cordova@5.0.0
	    	npm install -g ionic@1.3.2
	    	printf "\e[0;36mInstallation finished.\n"
	    	printf "\e[0m"
	    	exit
    	fi

	    if [ "$1" != "help" ] && [ "$1" != "start" ] && [ "$1" != "build" ] && [ "$1" != "run" ] && [ "$1" != "release" ] && [ "$1" != "plugins" ] && [ "$1" != "plugins" ]; then
	    	printf "\e[0;31m\n"
	    	printf "Command not recognized. Please see \e[0;32mug help\e[0;31m for a list of available commands.\n"
	    	printf "\e[0m\n"
	    	exit
	    fi

		numArgs="$#";
		if [ "$numArgs" == 0 ];
			then ./scripts/ug_help.sh
		fi

		if [ "$numArgs" == 1 ];
			then ./scripts/ug_$1.sh
		fi

		if [ "$numArgs" == 2 ];
			then ./scripts/ug_$1.sh $2
		fi

		if [ "$numArgs" == 3 ];
			then ./scripts/ug_$1.sh $2 $3
		fi

		if [ "$numArgs" == 4 ];
			then ./scripts/ug_$1.sh $2 $3 $4
		fi