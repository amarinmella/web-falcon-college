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

// Target link strings for replacements
const mediaTarget = '<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 transition-transform duration-200" href="contacto-media.html">Contacto</a>';
const mediaReplacement = '<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 transition-transform duration-200" href="convivencia-media.html">RICE y Protocolos</a>\n                <a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 transition-transform duration-200" href="contacto-media.html">Contacto</a>';

const littleTarget = '<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 duration-200 focus:underline decoration-2 underline-offset-4" href="contacto-little.html">Contacto</a>';
const littleReplacement = '<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 duration-200 focus:underline decoration-2 underline-offset-4" href="convivencia-little.html">RICE y Protocolos</a>\n                <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 duration-200 focus:underline decoration-2 underline-offset-4" href="contacto-little.html">Contacto</a>';

function updateFooters(files, targetString, replacementString) {
  files.forEach(fileName => {
    const filePath = path.join(projectDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${fileName}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(targetString)) {
      // Avoid double injection if already has convivencia link
      if (content.includes('convivencia-media.html') || content.includes('convivencia-little.html')) {
        console.log(`Skipping: ${fileName} (already contains Convivencia link)`);
        return;
      }
      
      const newContent = content.replace(targetString, replacementString);
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Successfully updated footer links in: ${fileName}`);
    } else {
      console.log(`Target string not found in: ${fileName}`);
    }
  });
}

console.log('--- Starting Sede Media footer updates ---');
updateFooters(mediaFiles, mediaTarget, mediaReplacement);

console.log('\n--- Starting Sede Básica footer updates ---');
updateFooters(littleFiles, littleTarget, littleReplacement);

console.log('\nFooter updates complete.');
