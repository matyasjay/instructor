DEFAULT_PROJECTNAME=instructor

NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

echo "${F_BOLD}${F_DIM}Update package versions...${NO_FORMAT}"

if ! git diff-index --quiet HEAD -- || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  echo "${F_BOLD}${C_INDIANRED1}Working directory is not clean. Commit or stash your changes first.${NO_FORMAT}"
  exit 1
else
  echo "${F_BOLD}${C_SEAGREEN2}Working directory is clean.${NO_FORMAT}"
fi

VERSION=$(node -p "require('./package.json').version")
echo -n "${F_DIM}${C_GREY46}Current: ${VERSION}${NO_FORMAT}"

echo -n "${F_BOLD}${C_GREY62}Enter project name (${DEFAULT_PROJECTNAME})?${NO_FORMAT}"

read project
project=${project:-$DEFAULT_PROJECTNAME}

echo -n "${F_DIM}${C_GREY46}Project: '$project'${NO_FORMAT}"
echo -n "${F_DIM}${C_GREY46}Cluster: '$project-<local|dev|stg|prod>'${NO_FORMAT}"

node cli/semver.mjs || exit 1

VERSION=$(node -p "require('./package.json').version")
echo -n "${F_DIM}${C_GREY46}Version: ${VERSION}${NO_FORMAT}"

sed -i '' "s/Release-.*-blue/Release-${VERSION}-blue/" README.md

git tag -a "v${VERSION}" -m "Release v${VERSION}${NO_FORMAT}"

echo -n "${F_DIM}${C_GREY46}Tag: 'Release v${VERSION}'${NO_FORMAT}"
echo -n "${F_DIM}${C_GREY46}Release: '$project v${VERSION}'${NO_FORMAT}"

git add \
  package.json \ 
  docker/package.json \
  frontend/package.json \
  http/package.json \
  script/package.json \
  terraform/package.json \
  README.md 

git commit -m "chore(ci): bump version v${VERSION}"

git push origin "v${VERSION}"

echo -n "${F_BOLD}${C_SEAGREEN2}Updated package versions successfully!${NO_FORMAT}"
exit 0
