const fs = require('fs');
const path = require('path');

const spriteFolder = path.join(__dirname, 'assets', 'sprites');
const shinyFolder = path.join(__dirname, 'assets', 'shiny_sprites');

function getFilenames(folderPath) {
  return fs.readdirSync(folderPath).filter(file => file.endsWith('.png'));
}

const spriteFiles = getFilenames(spriteFolder);
const shinyFiles = getFilenames(shinyFolder);

fs.writeFileSync('sprites.json', JSON.stringify(spriteFiles, null, 2));
fs.writeFileSync('shiny_sprites.json', JSON.stringify(shinyFiles, null, 2));

console.log('JSON files generated: sprites.json and shiny_sprites.json');