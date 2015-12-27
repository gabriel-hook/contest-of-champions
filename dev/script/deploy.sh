cd .build/

git init

git config user.name "Travis CI"
git config user.email "hook@travis-ci.org"

git add .
git commit -m "Travis-CI auto-deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1