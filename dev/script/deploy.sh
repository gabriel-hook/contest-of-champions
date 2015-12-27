cd .build/

git init

git config user.name "Travis CI"
git config user.email "hook@travis-ci.org"

git add .
git commit --quiet -m "Travis-CI to GitHub Pages"
git push --force "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1 || true

echo "Deployed to gh-pages"
