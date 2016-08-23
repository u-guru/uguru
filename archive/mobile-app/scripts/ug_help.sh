#!/bin/bash
printf '\n'
printf '\e[0;36m Available Commands \e[0m\n'
printf '\n'
printf '\e[0;32mstart \e[0m: Enables the neccessary user permissions to run the scripts.\n'
printf '\n'
printf '\e[0;32mbuild <android | ios> \e[0m: Installs the specified platform along with required plugins.\n'
printf '\n'
printf '\e[0;32mrun <android | ios> \e[0m: Runs livereload along with optional argument for starting page. Requires build <android | ios> before running.\n'
printf '\n'
printf '\e[0;32mrelease <android | ios> \e[0m: Generates production-ready builds.  Only the Android process will automate through to the final signed and zipped apks.  Whereas current IOS process will end on xCode opening for user input. \n'
printf '\n'
printf '\e[0;32m plugins <add | rm > <plugin-path> : Installs or uninstalls the specified plugin based on relative path or URL. \n'
printf '\n'
printf '\e[0;37mpush : Not Available. Compile and generate production both Android/Ios \e[0m\n'
printf '\n'
