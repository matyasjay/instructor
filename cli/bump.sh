node cli/semver.mjs 

VERSION=$(node -p "require('./package.json').version")

git tag -a "v$VERSION" -m "Release v$VERSION"

git add package.json
git commit -m "chore(ci): bump version v$VERSION"

git push origin "v$VERSION"
