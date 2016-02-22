#!/bin/bash
GREEN='\033[0;32m'        
RED='\033[0;31m'
NC='\033[0;0;0m' # No Color
# 
if [  $# -eq 0 ]; then
	printf "${RED} Please add a message ${NC} \n"
	exit
fi

if [  $# -eq 1 ]; then
	branch=$(git rev-parse --abbrev-ref HEAD)
	printf "${GREEN}Pushing to Staging from ${RED}$branch${NC} ${GREEN}branch with message : '${RED}$1${GREEN}' ${NC} \n"
	read -r -p "Are you sure? [yes] " response
	if [[ $response =~ ^(yes|y)$ ]]
	then
		printf "${GREEN}Pushing ^_^~${NC} \n"
		printf "${GREEN}Add all the file...${NC} \n"
		git add -A .
		printf "${GREEN}Commit with message : ${RED}$1${NC} \n"
		git commit -m '$1'
		printf "${GREEN}Pushing Staging from ~${NC} \n"
		# git push staging {{CURRENT_BRANCH_NAME}}:master
	else
		printf "${GREEN}Plese making sure and run the same command again ^_^ ${NC} \n"
		exit
	fi
fi