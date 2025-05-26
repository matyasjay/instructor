NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

echo "${F_BOLD}${F_DIM}Update package versions.${NO_FORMAT}"
echo "${F_DIM}${C_GREY46}Project: '$PROJECT'${NO_FORMAT}"
echo "${F_DIM}${C_GREY46}Cluster: '$PROJECT-<local|dev|stg|prod>'${NO_FORMAT}"

if ! git diff-index --quiet HEAD -- || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  echo "${F_BOLD}${C_INDIANRED1}Working directory is not clean. Commit or stash your changes first.${NO_FORMAT}"
  exit 1
else
  echo "${F_BOLD}${C_SEAGREEN2}Working directory is clean.${NO_FORMAT}"
fi

VERSION=$(node -p "require('./package.json').version")
echo "${C_INDIANRED1}Deprecated ${F_BOLD}${VERSION}${NO_FORMAT}"

node scripts/package/semver.mjs

VERSION=$(node -p "require('./package.json').version")
echo "${C_SEAGREEN2}Upstream ${F_BOLD}${VERSION}${NO_FORMAT}"

sed -i '' "s/Release-.*-blue/Release-${VERSION}-blue/" README.md
git tag -a "v${VERSION}" -m "Release v${VERSION}"

echo "${F_DIM}${C_GREY62}Tag '${PROJECT} v${VERSION}' ready to be released.${NO_FORMAT}."

git add \
  package.json \ 
  docker/package.json \
  frontend/package.json \
  http/package.json \
  script/package.json \
  terraform/package.json \
  README.md 

git commit -m "chore(ci): bump version v${VERSION}"

echo "${F_DIM}${C_GREY62}Changes are committed and ready to push.${NO_FORMAT}"

echo "${F_BOLD}${C_SEAGREEN2}Updated package versions successfully!${NO_FORMAT}"

exit 0
