# Contest of Champions Tools

  These tools are meant for the community of the game Marvel/Kabam's Contest of Champions.

## Roster Manager
  
  Webapp: [gabriel-hook.github.io/contest-of-champions](http://gabriel-hook.github.io/contest-of-champions/)
  Tiny: [tiny.cc/champions](http://tiny.cc/champions)

### Roster Page

  This is the default view where you can view and modify your roster.
    
  Use the side panel to open an Add Champion sub-page as well as filter and sort your champions.
    
  Selecting a champion here lets you update their rank, level and other attributes.

### Team Page

  This is where your teams will be displayed (with extras if the option is selected) once they are built.

  From the build settings panel you can go to the advanced settings page or build a set of teams.

### Guide Page

  These pages give details on each champion: abilities, styles, synergies and availability in crystals.
    
## Synergy Tool
  
  Webapp: [gabriel-hook.github.io/contest-of-champions/synergies](http://gabriel-hook.github.io/contest-of-champions/synergies)
  Tiny: [tiny.cc/synergies](http://tiny.cc/synergies)

### Synergies Page

  This tool lets you see the synergies between all champions of a given star value.
    
  Double-clicking on a desktop browser will redirect to the Roster Manager's Guide for that champion.

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
