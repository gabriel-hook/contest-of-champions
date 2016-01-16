# [<img src="dev/images/icon.png" width="28" height="28" alt="Icon">](#-guides) Guides

This is a quickguide for building Champion Guides for the Champions Companion App.

## Editing & Import/Export

  Creating the guide .json file.

### Open the Editor

  First, open up the editor and navigate to the guide for the Champion you want to edit.

```
  http://hook.github.io/champions/#/guide/blackbolt
```

Now append a `/edit` to the url so that your new url looks like this:

```
  http://hook.github.io/champions/#/guide/blackbolt/edit
```

You are now in edit mode and can go back and forth between edit and view via the button in
the bottom left corner of the screen.

*The edit button needs to be re-enabled each time you restart the App.* 

### Import

If you already have a file you want to work from, open the main menu from the edit
page and choose the **Import .json** option. This will let you choose the file to load
and then replace the existing guide locally.

### Edit

From the `/edit` page, update the fields you want, and set ratings via the drop-down selectors.
You can go back and forth between the view and edit pages to preview/update until you are
happy with the guide.

### Export

Once the guide is in a savable state, navigate to the options menu from in the `/edit` page
and choose the **Export .json** option. This will save a .json file to your browser's
Download directory.

## Publishing

There are 2 ways you can start the publishing process for a finished guide.

### E-mail

Send me an e-mail with the guide .json file attached and if the quality is good I will merge it
into the main project.

### Git Pull Request

If you are savvy with code, you can put the .json file into a fork of this repo, in the
`./src/data/guide/[id].json` path (where [id] is Champions unique ID according to
[./src/data/champions.js](src/data/champions.js).
 
If you want to link up the guide yourself and test it locally make sure to update the guide
file as so (example for blackbolt)

[./src/data/guides.js](src/data/guides.js)
```javascript
import blackbolt from './guide/blackbolt';

const guides = {
    blackbolt,
    ...
```
*Just make sure you import the guide and then add it to the guides object.*

Once the file has been added properly, send a pull request and I will review and probably add
it to the App immediately.