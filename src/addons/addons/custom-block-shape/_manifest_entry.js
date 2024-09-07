/* generated by pull.js */
const manifest = {
  "editorOnly": true,
  "noTranslations": true,
  "name": "Customizable block shape",
  "description": "Adjust the padding, corner radius, and notch height of blocks.",
  "tags": [
    "theme"
  ],
  "credits": [
    {
      "name": "SheepTester",
      "link": "https://scratch.mit.edu/users/Sheep_maker/"
    },
    {
      "name": "lisa_wolfgang",
      "link": "https://scratch.mit.edu/users/lisa_wolfgang/"
    },
    {
      "name": "pumpkinstuf",
      "link": "https://scratch.mit.edu/users/Pumpkinbunny/"
    },
    {
      "name": "GarboMuffin",
      "link": "https://scratch.mit.edu/users/GarboMuffin/"
    }
  ],
  "enabledByDefault": false,
  "dynamicDisable": true,
  "userscripts": [
    {
      "url": "userscript.js"
    }
  ],
  "info": [
    {
      "type": "notice",
      "text": "Decreasing the padding size is only visible to you, so when your projects are viewed by other users, your scripts may overlap.",
      "id": "paddingWarning"
    }
  ],
  "settings": [
    {
      "dynamic": true,
      "name": "Padding size (50-200%)",
      "id": "paddingSize",
      "type": "integer",
      "min": 50,
      "default": 100,
      "max": 200
    },
    {
      "dynamic": true,
      "name": "Corner size (0-300%)",
      "id": "cornerSize",
      "type": "integer",
      "min": 0,
      "default": 100,
      "max": 300
    },
    {
      "dynamic": true,
      "name": "Notch height (0-150%)",
      "id": "notchSize",
      "type": "integer",
      "min": 0,
      "default": 100,
      "max": 150
    }
  ],
  "presets": [
    {
      "name": "3.0 Blocks",
      "id": "default3",
      "description": "The regular appearance of Scratch 3.0 blocks",
      "values": {
        "paddingSize": 100,
        "cornerSize": 100,
        "notchSize": 100
      }
    },
    {
      "name": "2.0 Blocks",
      "id": "default2",
      "description": "An appearance similar to Scratch 2.0 blocks",
      "values": {
        "paddingSize": 70,
        "cornerSize": 150,
        "notchSize": 75
      }
    },
    {
      "name": "3.0 Flat",
      "id": "flat3",
      "description": "Scratch 3.0 blocks with notches and corners removed",
      "values": {
        "paddingSize": 100,
        "cornerSize": 0,
        "notchSize": 0
      }
    },
    {
      "name": "2.0 Flat",
      "id": "flat2",
      "description": "Scratch 2.0 blocks with notches and corners removed",
      "values": {
        "paddingSize": 70,
        "cornerSize": 0,
        "notchSize": 0
      }
    }
  ]
};
export default manifest;
