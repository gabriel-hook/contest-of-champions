# [<img src="dev/images/icon.png" width="28" height="28" alt="Icon">](#-champions) Champions

[<img src="https://travis-ci.org/hook/champions.svg?branch=master" alt="Build Status">](https://travis-ci.org/hook/champions)
[<img src="https://img.shields.io/gitter/room/hook/champions.svg" alt="Join the chat at https://gitter.im/hook/champions">](https://gitter.im/hook/champions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Development

  Clone this repository with git.

### Installation

  Install all [NPM](https://www.npmjs.com/) packages and update packages that need it.

```
  $ npm install
```


### Local Development

  Run a webpack-dev-server and navigate to [localhost:8080](http://localhost:8080) test changes. 

```
  npm run develop
```

### Linting and Testing

  Periodically lint your code and run tests to ensure basic functionality has not broken.
  ESLint and SassLint can be enabled inside your IDE for
  [Webstorm](https://www.jetbrains.com/webstorm/), [Sublime Text](http://www.sublimetext.com/)
  or [Atom](https://atom.io/).
    
```
  npm run test
```

### Deploying

  Lint, Test, Build and publish to gh-pages branch is done automatically by Travis-CI on `git push`.

