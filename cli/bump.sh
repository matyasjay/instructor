if ! git diff-index --quiet HEAD -- || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  echo "Working directory is not clean. Commit or stash your changes first."
  exit 2
else
  echo "Working directory is clean."
fi


node cli/semver.mjs 

VERSION=$(node -p "require('./package.json').version")

git tag -a "v$VERSION" -m "Release v$VERSION"

git add package.json
git commit -m "chore(ci): bump version v$VERSION"

git push origin "v$VERSION"

exit 0
