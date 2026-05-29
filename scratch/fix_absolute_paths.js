const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');

// Find all HTML files in the project root
const files = fs.readdirSync(projectDir).filter(file => file.endsWith('.html'));

files.forEach(fileName => {
  const filePath = path.join(projectDir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace src="/logo-falcon-college_.svg" with src="logo-falcon-college_.svg"
  content = content.replace(/src="\/logo-falcon-college_\.svg"/g, 'src="logo-falcon-college_.svg"');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully fixed absolute logo path in: ${fileName}`);
  } else {
    console.log(`No absolute logo paths found in: ${fileName}`);
  }
});

console.log('Absolute path correction complete.');
