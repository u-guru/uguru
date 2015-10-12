
if [ $# == 0 ];	then 
	printf "\e[0;36m\n"
	printf 'plugins <add|rm> <android|ios> <plugin-path> : Installs or uninstalls the specified plugin based on relative file path or URL. You must also specify the target platform. \n'
	printf "\nThis is only for general-related plugins that do not depend on install order.  For specific plugins please manually copy the plugin directory into the respetive platform/specific folder.\n"
	printf "\e[0m\n"
fi

if [ $# == 1 ] || [ $# == 2 ]; then 
	option="$1";
	if [ $option == 'add' ]; then
		printf "\n"
		printf '\e[0;36mplugins add <platform> <plugin-path> : Please provide the platform relative file path or URL of the plugin. \n'
		printf "\e[0m\n"
	else 
		printf '\e[0;36m\nplugins <add|rm> <platform> <plugin-path> : Please provide the platform and relative file path or URL of the plugin. \n'
		printf "\e[0m\n"
	fi
	if [ $option == 'rm' ] || [ $option == 'remove' ]; then
		printf "\n"
		printf '\e[0;36mplugins remove <platform> <plugin-path> : Please provide the platform and relative file path or URL of the plugin. \n'
		printf "\e[0m\n"
	else 
		printf '\e[0;36m\nplugins <add|rm> <platform> <plugin-path> : Please provide the platform and relative file path or URL of the plugin. \n'
		printf "\e[0m\n"
	fi
fi

if [ $# == 3 ]; then
	option="$1";
	platform="$2";
	plugin="$3";
	# printf "option: $option platform: $platform plugin: $plugin \n"
	if 	([ $option == 'add' ] || [ $option == 'rm' ] || [ $option == 'remove' ]) &&
		([ $platform == 'android' ] || [ $platform == 'ios' ]) &&
		[ -e "$plugin/plugin.xml" ] || [[ $plugin == *'github.com'* ]]; then

		cordova platform rm android
		cordova platform rm ios
		rm -rf plugins/*
		
		if [ $option == 'add' ]; then
			cordova plugins $option $plugin
			cp -R plugins/. plugins_$platform/general/
			./scripts/ug_build.sh $platform
		fi

		if [ $option == 'rm' ] || [ $option == 'remove' ]; then
			cordova plugins add $plugin
			pluginfile="$(ls -l ./plugins/ | grep '^d' | head -1 | awk '{print $9}')"
			rm -rf plugins_$platform/general/$pluginfile
			rm -rf plugins/*
			./scripts/ug_build.sh $platform
		fi

	else 
		printf "\e[0;31m\n"
		printf "ERROR: Please make sure all fields are valid.\n"
		printf "ug plugins <add|rm> <android|ios> <plugin-path>\n"
		printf "\e[0m\n"
	fi

fi









