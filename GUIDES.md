# [<img src="dev/images/icon.png" width="28" height="28" alt="Icon">](#-guides) Guides

Instructions for creating and publishing Champion guides.

## Editing & Import/Export

  Creating the guide .json file.

### Open the Editor

  First, open up the editor and navigate to the guide page for the Champion that you want to edit.

```
  http://hook.github.io/champions/#/guide/blackbolt
```

Now append a `/edit` to the url so that your new url looks like this.

```
  http://hook.github.io/champions/#/guide/blackbolt/edit
```

You are now in edit mode and can go back and forth between edit mode and view mode via the
button in the bottom left corner of the screen.

*The edit button needs to be re-enabled each time you restart the App.*

### Import

If you already have a file you want to work from, open the main menu from the `/edit`
page and choose the **Import .json** option. This will let you choose the file to load
and then replace the existing guide locally.

### Edit

From the `/edit` page, update the text fields and set ratings/attributes via the drop-down
selectors. You can go back and forth between the view and edit pages to preview/update until
you are ready to publish.

### Export

Once the guide is in a complete state, navigate to the options menu from in the `/edit` page
and choose the **Export .json** option. This will save a .json file to your browser's
Download directory.

## Publishing

Getting the .json guide into the App.

### Github Issue

You can create an Issue in this github repository and attach the .json file there. I will
review it and merge quality work into the App.

### Git Pull Request

If you are savvy with code, you can put the .json file into a fork of this repo, in the
`./src/data/guide/[id].json` path (where [id] is Champions unique ID according to
[./src/data/champions.js](src/data/champions.js), and then test it locally.

Once the file has been added properly, send a pull request and I will review and add
quality work to the App.
