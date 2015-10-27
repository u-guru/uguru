#! /bin/sh
expect << 'END'
	set username "uguru-nick"
	set password "uguru123"
	spawn cordova plugin add https://bitbucket.org/uguru-nick/de.appplant.cordova.plugin.badge
	expect "Username for 'https://bitbucket.org':"
	send "$username\r"
	expect "assword"
	send "$password\r"
	interact
END

printf "hi"