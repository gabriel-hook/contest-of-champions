cd .build/

git init

git config user.name "Travis CI"
git config user.email "git@travis-ci.org"

git add .
git commit --quiet -m "Travis-CI to GitHub Pages"

echo "Deploying to gh-pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
