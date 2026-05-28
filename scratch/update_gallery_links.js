const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');

const mediaFiles = [
  'falcon-college.html',
  'nosotros-media.html',
  'admision-media.html',
  'tecnico-profesional.html',
  'contacto-media.html',
  'noticias-media.html'
];

const littleFiles = [
  'falcon-little.html',
  'nosotros-little.html',
  'admision-little.html',
  'academico-little.html',
  'contacto-little.html',
  'noticias-little.html'
];

// Regex to match href="#" that is immediately followed by attributes and the anchor text "Galería"
const galleryRegex = /href="#"([^>]*>Galería<\/a>)/g;

function updateLinks(files, targetLink) {
  files.forEach(fileName => {
    const filePath = path.join(projectDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${fileName}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Perform replacement
    const newContent = content.replace(galleryRegex, `href="${targetLink}"$1`);
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Successfully updated Galería links in: ${fileName}`);
    } else {
      console.log(`No changes made to: ${fileName} (already updated or link not found)`);
    }
  });
}

console.log('--- Starting Sede Media replacements ---');
updateLinks(mediaFiles, 'galeria-media.html');

console.log('\n--- Starting Sede Básica replacements ---');
updateLinks(littleFiles, 'galeria-little.html');

console.log('\nLink replacements complete.');
