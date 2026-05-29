const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');

const mediaFiles = [
  'nosotros-media.html',
  'admision-media.html',
  'contacto-media.html',
  'tecnico-profesional.html'
];

const littleFiles = [
  'nosotros-little.html',
  'admision-little.html',
  'academico-little.html',
  'contacto-little.html'
];

// Helper to fix a file's "Noticias" and "Postula 2027" links
function fixLinks(fileName, isLittle) {
  const filePath = path.join(projectDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${fileName}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Fix "Noticias" links
  const newsTarget = isLittle ? 'noticias-little.html' : 'noticias-media.html';
  content = content.replace(/href="#"(?=[^>]*>Noticias<\/a>)/g, `href="${newsTarget}"`);

  // 2. Fix "Postula 2027" links
  const postulaTarget = isLittle ? 'admision-little.html' : 'admision-media.html';
  content = content.replace(/href="#"(?=[^>]*>Postula 2027<\/a>)/g, `href="${postulaTarget}"`);

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully fixed links in: ${fileName}`);
  } else {
    console.log(`No changes needed in: ${fileName}`);
  }
}

console.log('--- Fixing Sede Media files ---');
mediaFiles.forEach(file => fixLinks(file, false));

console.log('\n--- Fixing Sede Básica (Little) files ---');
littleFiles.forEach(file => fixLinks(file, true));

console.log('\nFixing complete.');
