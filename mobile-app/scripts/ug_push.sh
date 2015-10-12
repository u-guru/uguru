
if [ $# == 0 ];
	then 
	printf "\n"
	printf '\e[0;36m push <> : Generates production build and publishes to the app store.  Currently unavailable. \n'
	printf "\n"
fi


if [ $# == 1 ];
	then platform="$1";
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









