#!/bin/bash
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
		# ugbi --> install the necessary cordova plugins
		# ugbri --> build a release version
		cd platforms/ios
		fastlane init
		# y
		# y
		# com.Uguru.Uguru
		# makhani@berkeley.edu
		# y --> setup deliver
		# n
		# cert
		# gym -i Z3H2887UC4.cer -e AppStore_com.Uguru.Uguru.mobileprovision

		#
		# todo
		#

		# Insert Apple Devloper API here

		# ============================================
	fi

fi









