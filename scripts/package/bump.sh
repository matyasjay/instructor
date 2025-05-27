NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

echo "${F_BOLD}INFO\tUpdate package versions.${NO_FORMAT}"

PROJECT=""

if [ -z "$1" ]; then
  PROJECT="instructor"
else
  PROJECT=$1
fi

make info

if ! git diff-index --quiet HEAD -- || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  echo "${F_BOLD}${C_INDIANRED1}"
  echo "INFO\tWorking directory is not clean. Commit or stash your changes first.${NO_FORMAT}"
  exit 1
else
  echo "${C_GREY46}"
  echo "INFO\tWorking directory is clean.${NO_FORMAT}"
fi

VERSION=$(node -p "require('./package.json').version")
echo "${C_GREY46}"
echo "INFO\tDeprecated ${F_BOLD}${VERSION}${NO_FORMAT}"
echo "${C_GREY46}"
node scripts/package/semver.mjs
echo "${NO_FORMAT}"
VERSION=$(node -p "require('./package.json').version")
echo "${C_GREY46}INFO Package file versions updated to '${VERSION}'.${NO_FORMAT}."
echo "${C_GREY46}"
sed -i '' "s/Release-.*-blue/Release-${VERSION}-blue/" README.md
git tag -a "v${VERSION}" -m "Release v${VERSION}"
echo "${NO_FORMAT}"
echo "${C_GREY46}INFO Tag '${PROJECT} v${VERSION}' ready to be released.${NO_FORMAT}."
echo "${C_GREY46}"
git add package.json  docker/package.json frontend/package.json http/package.json scripts/package.json terraform/package.json README.md 
git commit -m "chore(ci): bump version v${VERSION}"
echo "${NO_FORMAT}"
echo "${C_GREY62}INFO Changes are committed and ready to push.${NO_FORMAT}"
echo "${F_BOLD}${C_SEAGREEN2}DONE Updated package versions successfully!${NO_FORMAT}"
exit 0
