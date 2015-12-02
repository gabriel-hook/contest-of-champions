# Development

  Clone this repository with git.

### Install Packages

  Install all [NPM](https://www.npmjs.com/) packages and update packages that need it.

```
  $ npm install gulp -g
  $ npm install
```

### Publishing

  Lint, Build, and Publish to gh-pages branch.

```
  gulp publish
```

### Testing

  Install http-server if you want to test changes locally.

```
  $ npm install http-server -g
```

  Build scripts and stylesheets. The --dev option skips minification and is faster.
  
```
  $ gulp build [--dev]
```

  Run a local server to test local changes and view at [localhost:9090](http://localhost:9090).
  
```
  $ http-server ./.build -p9090
```
