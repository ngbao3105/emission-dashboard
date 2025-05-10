const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'postcssrc-copy.json');
const dest = path.join(__dirname, '.postcssrc.json');

fs.copyFileSync(src, dest);
console.log('Copied postcssrc-copy.json to .postcssrc.json');