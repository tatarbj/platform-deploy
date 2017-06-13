#!/bin/bash
# Die if issue :
set -ex
# get commit from cli :
commit=$1
# Shift $1 out of the stack
shift
# Patch frenzy :
git fetch
for to_patch in $@; do
        git fetch origin ${to_patch}
	git checkout ${to_patch} 
	git cherry-pick -X theirs -x ${commit} # merge patch
	git push origin :${to_patch} # delete remote tag
	git tag -d ${to_patch} # delete local tag
	git tag ${to_patch} # local tag
	git push origin ${to_patch} # push new tag
done
