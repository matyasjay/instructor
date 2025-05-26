NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"

echo "Update package versions..."
if ! git diff-index --quiet HEAD -- || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  echo "${F_BOLD}${C_INDIANRED1}Working directory is not clean. Commit or stash your changes first.${NO_FORMAT}"
  exit 1
else
  echo "Working directory is clean."
fi
VERSION=$(node -p "require('./package.json').version")
echo -n "Current: $VERSION"
echo -n "Enter project name? "
read project
project=${project:-instructor}
echo "Project: '$project'"
echo "Cluster: '$project-<local|dev|stg|prod>'"
node cli/semver.mjs 
VERSION=$(node -p "require('./package.json').version")
echo -n "Version: $VERSION"
sed -i '' "s/Release-.*-blue/Release-${VERSION}-blue/" README.md
git tag -a "v$VERSION" -m "Release v$VERSION"
echo "Tag: 'Release v$VERSION'"
echo "Release: '$project v$VERSION'"
git add package.json docker/package.json terraform/package.json frontend/package.json http/package.json script/package.json README.md
git commit -m "chore(ci): bump version v$VERSION"
git push origin "v$VERSION"
echo "${F_BOLD}${C_SEAGREEN2}Updated package versions successfully!${NO_FORMAT}"
exit 0
