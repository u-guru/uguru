#!/bin/bash

# git fetch
# git log -10 --pretty=format:'"branch":"%Cred%d%Creset"%n"commit":"%H"%n"date": "%ad"%n"message": "%f" %n "test:"%D" '  --all --branches --no-merges 
git fetch && git log -10 --pretty=format:'"branch":"%Cred%d%Creset"%n"commit":"%H"%n"date": "%ad"%n"message": "%f" %n'  --all --branches 
# git log --all --decorate --branches --no-merges 


# for branch in `git branch -r | grep -v HEAD`
# do 
# 	echo `git show --format="%ci %cr" $branch | head -n 1` \\t$branch;	
# done | sort -r

# branchArr=( $(git branch -r | grep -v HEAD) )
# # for name in branchArr
# # do
# # 	echo $name
# # done | sort -r
# result=()
# for branch in "${branchArr[@]}";
# do
#    :
   # git log $branch -2\
   #     --pretty=format:'{%n  "commit": "%H",%n  "date": "%ad",%n  "message": "%f"%n},' \
   #     $@ | \
   #     perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
   #     perl -pe 's/},]/}]/'

   # do whatever on $i
   # printf '%s, ' "$branch"
   # recentDate="$(git show --format="%ci %cr" $branch | head -n 1)"
   # printf '%s  \t\t %s \n' "$recentDate" "$branch"
#    result+=($recentDate)
#    # echo `git show --format="%ci %cr" $branch | head -n 1`
# done

# log="$(git log $branch -2\
#     --pretty=format:'"commit":"%H"%n"date": "%ad"%n"message": "%f"%n' \
#     $@ | perl -pe 'BEGIN{print ""}; END{print ""}')"

#      #| \
#     # perl -pe 's/},]/}]/'`)


# printf '%s\n' "$log"







# recentDate="$(git show --format="%ci %cr" $branch | head -n 1)"
# result+=($recentDate)
# printf '%s' "${result[@]}"
# echo ${result[0]}

# branchArr+=('hiii')


# branch='jason-dev'
# hist="$(git log $branch -1 --pretty=format:'{%n  "commit": "%H",%n  "date": "%ad",%n  "message": "%f"%n}')"
# printf '%s' "$hist"
# printf $array
# $array
# printf '%s\n' "${array[@]}"
# branch='origin/jason-dev'
# # git log $branch -1 --pretty=format:'{%n  "commit": "%H",%n  "author": "%an <%ae>",%n  "date": "%ad",%n  "message": "%f"%n}' 
# printf $branch
# git log $branch -2\
#     --pretty=format:'{%n  "commit": "%H",%n  "date": "%ad",%n  "message": "%f"%n},' \
#     $@ | \
#     perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
#     perl -pe 's/},]/}]/'



# for log in `git log $branch`
# do
#  	$log
# done