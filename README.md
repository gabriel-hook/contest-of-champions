# Development

  Clone this repository with git.

### Install Packages

  Install all [NPM](https://www.npmjs.com/) packages and update packages that need it.

```
  $ npm install gulp -g
  $ npm install
```

  Update experimental packages
    
```
  $ cd node_modules/babel-plugin-mjsx
  $ npm install babel-cli -g
  $ npm install
  $ babel src --out-dir lib
```
    
```
  $ cd node_modules/simple-hot-loader
  $ npm install
```

### Publishing

  Build v1 and v2 and publish to gh-pages branch.

```
  gulp publish
```

### Testing v1

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

### Testing v2

  Run a webpack-dev-server for v2 and navigate to [localhost:8080](http://localhost:8080) test changes. 

```
  gulp webpack-dev
```
