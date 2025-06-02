source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "\n${F_BOLD}Update Package Version${NO_FORMAT}\n"

make info

if ! git diff-index --quiet HEAD -- || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  echo "${F_BOLD}${C_INDIANRED1}Working directory is not clean. Commit or stash your changes first.${NO_FORMAT}\n"
  exit 1
else
  echo "Progress\n${NO_FORMAT}${C_GREY46}INFO\tWorking directory is clean."
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

echo "\nINFO\tChanges are committed and ready to push.${NO_FORMAT}"
echo "\n${F_BOLD}Package versions updated!${NO_FORMAT}\n"
exit 0
