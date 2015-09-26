# Contest of Champions Tools

  These tools are meant for the community of the game Marvel/Kabam's Contest of Champions.

## Roster Manager
  
  Webapp: [gabriel-hook.github.io/contest-of-champions](http://gabriel-hook.github.io/contest-of-champions/)
  Tiny: [tiny.cc/champions](http://tiny.cc/champions)

### Roster Page

  This is the default view where you can view and modify your roster.
    
  Use the side panel to open an Add Champion subpage as well as filter and sort your champions.
    
  Selecting a champion here lets you update their rank, level and other attributes.

### Team Page

  This is where your teams will be displayed (with extras if the option is selected) once they are built.

  From the build settings panel you can go to the advanced settings page or build a set of teams.
    
#### Algorithms

Greedy
> This picks the best team mathematically given all parameters. It is the slowest but best if you want to choose 1 team. When you pick multiple teams it will choose the best team and then do the same on the remainders until you use up all of the champions. It does it pretty well at first, but the teams get worse as the list goes on. 
>
> USE THIS FOR YOUR SINGLE QUEST TEAM.

Shuffle
> This sets up random teams initially, and then swaps champions on teams until swaps won't improve the overall scores of teams (scores being the internal ratings I give them). This is very fast and creates the best assortment of balanced teams with large numbers of champions. 
> 
> USE THIS FOR YOUR MULTIPLE ARENA TEAMS.

Distinct
> I built an experimental algorithm that dissects the graph of synergies to pick teams. I still need to work on it to make it better but it is the fastest of the 3. It should almost pick teams comparable to shuffle, but it will always get the same result. Use this is you want to possibly see alternatives to the shuffle results.

### Guide Page

  These pages give details on each champion: abilities, styles, synergies and availablity in crystals.
    
## Synergy Tool
  
  Webapp: [gabriel-hook.github.io/contest-of-champions/synergies.html](http://gabriel-hook.github.io/contest-of-champions/synergies.html)
  Tiny: [tiny.cc/synergies](http://tiny.cc/synergies)

### Synergies Page

  This tool lets you see the synergies between all champions of a given star value.
    
  Double-clicking on a desktop browser will redirect to the Roster Manager's Guide for that champion.

# Development

  Clone this repository with git.

  Install all [NPM](https://www.npmjs.com/) packages

```
  $ npm install gulp --global
  $ npm install
```

  To build the current source into minified js and css, run with [Gulp](http://gulpjs.com/)

```
  $ gulp
```

  To build as you modify

```
  $ gulp watch
```
