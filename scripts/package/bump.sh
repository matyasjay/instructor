NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

echo "\n${F_BOLD}Update package versions.${NO_FORMAT}\n"

PROJECT=""

if [ -z "$1" ]; then
  PROJECT="instructor"
else
  PROJECT=$1
fi

make info

if ! git diff-index --quiet HEAD -- || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  echo "${F_BOLD}${C_INDIANRED1}Working directory is not clean. Commit or stash your changes first.${NO_FORMAT}\n"
  exit 1
else
  echo "${C_GREY46}INFO\tWorking directory is clean."
fi

VERSION=$(node -p "require('./package.json').version")
echo "INFO\tDeprecated${NO_FORMAT} ${C_INDIANRED1}${VERSION}${NO_FORMAT}${C_GREY46}"

node scripts/package/semver.mjs

VERSION=$(node -p "require('./package.json').version")

echo "INFO\tPackage file versions updated to ${NO_FORMAT}${C_SEAGREEN2}${VERSION}${NO_FORMAT}${C_GREY46}."

sed -i '' "s/Release-.*-blue/Release-${VERSION}-blue/" README.md
git tag -a "v${VERSION}" -m "Release v${VERSION}"

echo "INFO\tTag '${PROJECT} v${VERSION}' ready to be released.\n"

git add package.json  docker/package.json frontend/package.json http/package.json scripts/package.json terraform/package.json README.md 
git commit -m "chore(ci): bump version v${VERSION}"

echo "INFO\tChanges are committed and ready to push.${NO_FORMAT}"
echo "\n${F_BOLD}${C_SEAGREEN2}DONE Updated package versions successfully!${NO_FORMAT}\n"
exit 0
