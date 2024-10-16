/* generated by pull.js */
const manifest = {
  "noTranslations": true,
  "editorOnly": true,
  "name": "Blockly menu scroll speed",
  "description": "Change the speed that the blocks menu scrolls.",
  "credits": [
    {
      "name": "LilyMakesThings",
      "link": "https://scratch.mit.edu/users/LilyMakesThings/"
    },
    {
      "name": "pumpkinstuf"
    }
  ],
  "userscripts": [
    {
      "url": "scroll.js"
    }
  ],
  "settings": [
    {
      "dynamic": true,
      "name": "On Category Select",
      "id": "selectSpeed",
      "type": "select",
      "potentialValues": [
        {
          "id": "none",
          "name": "Instant"
        },
        {
          "id": "veryfast",
          "name": "Very Fast"
        },
        {
          "id": "fast",
          "name": "Fast"
        },
        {
          "id": "default",
          "name": "Default"
        },
        {
          "id": "long",
          "name": "Slow"
        },
        {
          "id": "verylong",
          "name": "Very Slow"
        }
      ],
      "default": "default"
    }
  ],
  "dynamicDisable": false,
  "enabledByDefault": true,
  "tags": [
    "recommended",
    "new"
  ]
};
export default manifest;
