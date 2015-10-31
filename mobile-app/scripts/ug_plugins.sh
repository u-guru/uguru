#!/bin/bash
if [ $# == 0 ];	then 
	printf "\n"
	printf '\e[0;36mplugins <add | rm > <android | ios> <plugin-path> : Installs or uninstalls the specified plugin based on relative file path or URL. Must also specify the target platform. \n'
	printf "\n"
fi


if [ $# == 1 ];	then 
	option="$1";
	if [ $option == 'add' ]; then
		printf "\n"
		printf '\e[0;36mplugins add <plugin-path> : Please provide the plugin relative file path or URL. \n'
		printf "\n"	
	fi
	if [ $option == 'rm' ] || [ $option == 'remove' ]; then
		printf "\n"
		printf '\e[0;36mplugins remove <plugin-path> : Please provide the plugin relative file path or URL. \n'
		printf "\n"	
	fi
fi

if [ $# == 2 ]; then
	platform="$2";

	if [ $platform == 'android' ] || [ $platform == 'ios' ]; then
		printf "\n"
		printf '\e[0;36mplugins remove <plugin-path> : Please provide the plugin relative file path or URL. \n'
		printf "\n"	
	fi

fi


if [ $# == 3 ]; then 
	option="$1";
	platform="$2";
	plugin="$3";

	if [ $option == 'add' ]; then
		
		if [ ! -e "$plugin/plugin.xml" ]; then
			printf "ERROR: Could not detect a valid plugin. Make sure the file path is a directory that contains a plugin.xml or that the URL points to a GitHub repository.\n"
			return
		fi



	fi

	if [ $option == 'rm' ] || [ $option == 'remove' ]; then
	
	fi

	printf "\n"
	printf "\e[0;36m Passed into ug_push.sh: $platform \e[0m\n"
	printf "\n"

	if [ $platform == 'android' ]; then
		./scripts/ug_build.sh android
		./scripts/ug_release.sh android
		# ============================================

		# Insert Google Publisher API here

		# ============================================
	fi

	if [ $platform == "ios" ]; then
		./scripts/ug_build.sh ios
		./scripts/ug_release.sh ios
		# ============================================

		# Insert Apple Devloper API here

		# ============================================
	fi

fi









