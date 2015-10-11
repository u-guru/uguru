if [[ "$PWD" != *'mobile-app'* ]]; then
	printf "\e[0;31m"
	printf "Please ensure that you are in the /mobile-app/ directory.\n"
	printf "\e[0m"
	return
	fi

if [ "$1" == "start" ]; then
	printf "\e[0;36mEnabling user permissions...\n"
	if [ ! -f ./scripts/ug_help.sh ]; then
		printf "\e[0;31mERROR: Could not locate ug scripts.\n"
	    printf "Please ensure that you are in the /mobile-app/ directory."
	    printf "\e[0m"
	    return
	fi
	chmod 777 ./scripts/ug_help.sh
	chmod 777 ./scripts/ug_build.sh
	chmod 777 ./scripts/ug_run.sh
	chmod 777 ./scripts/ug_release.sh
	printf "\n"
	printf "You have successfully installed the ug command line interface. \n"
	printf "For a list of available commands please refer to the help option (ug help). \n"
	printf "\e[0m"
	return
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
