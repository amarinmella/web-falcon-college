const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');

const mediaFiles = [
  'falcon-college.html',
  'nosotros-media.html',
  'admision-media.html',
  'tecnico-profesional.html',
  'contacto-media.html',
  'noticias-media.html',
  'galeria-media.html',
  'convivencia-media.html'
];

const littleFiles = [
  'falcon-little.html',
  'nosotros-little.html',
  'admision-little.html',
  'academico-little.html',
  'contacto-little.html',
  'noticias-little.html',
  'galeria-little.html',
  'convivencia-little.html'
];

// Regex to remove any existing RICE links from navbars (matches block or relative style href to convivencia page)
const cleanRegex = /\s*<li><a[^>]*convivencia-(media|little)\.html[^>]*>RICE( y Protocolos)?<\/a><\/li>/g;

function cleanAndProcessMedia(fileName) {
  const filePath = path.join(projectDir, fileName);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Clean previous links
  content = content.replace(cleanRegex, '');

  // 2. Restore active Nosotros if it was cleared in convivencia page
  if (fileName === 'convivencia-media.html') {
    content = content.replace('after:scale-x-0" href="nosotros-media.html">Institución', 'after:scale-x-100" href="nosotros-media.html">Institución');
  }

  // 3. Define the new RICE y Protocolos links
  const isActivePage = fileName === 'convivencia-media.html';
  const riceDesktopClass = isActivePage ? 'after:scale-x-100' : 'after:scale-x-0';
  const nosotrosClass = isActivePage ? 'after:scale-x-0' : 'after:scale-x-100'; // Make Nosotros inactive on Convivencia page

  // RICE y Protocolos markup
  const desktopLink = `<li><a class="relative text-white/90 hover:text-white transition-colors font-semibold text-[15px] tracking-wide after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#FFE299] ${riceDesktopClass} hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left" href="convivencia-media.html">RICE y Protocolos</a></li>`;
  const mobileLink = `<li><a class="block text-white/90 hover:text-white font-semibold text-[15px]" href="convivencia-media.html">RICE y Protocolos</a></li>`;

  // Apply active/inactive switches for Nosotros
  if (isActivePage) {
    content = content.replace('after:scale-x-100" href="nosotros-media.html">Institución', 'after:scale-x-0" href="nosotros-media.html">Institución');
  }

  // Desktop Navbar Insertion: find first Nosotros occurrence
  const target = 'href="nosotros-media.html">Institución</a></li>';
  let firstIndex = content.indexOf(target);
  if (firstIndex !== -1) {
    const replacement = target + '\n                ' + desktopLink;
    content = content.substring(0, firstIndex) + replacement + content.substring(firstIndex + target.length);
    
    // Mobile Navbar Insertion: find second Nosotros occurrence (searching AFTER the first index + replacement length)
    let secondIndex = content.indexOf(target, firstIndex + replacement.length);
    if (secondIndex !== -1) {
      const replacementMobile = target + '\n                ' + mobileLink;
      content = content.substring(0, secondIndex) + replacementMobile + content.substring(secondIndex + target.length);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully cleaned and updated Navbar in Sede Media: ${fileName}`);
}

function cleanAndProcessLittle(fileName) {
  const filePath = path.join(projectDir, fileName);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Clean previous links
  content = content.replace(cleanRegex, '');

  // 2. Restore active Nosotros if it was cleared in convivencia page
  if (fileName === 'convivencia-little.html') {
    content = content.replace('after:scale-x-0" href="nosotros-little.html">Institución', 'after:scale-x-100" href="nosotros-little.html">Institución');
  }

  // 3. Define the new RICE y Protocolos links
  const isActivePage = fileName === 'convivencia-little.html';
  const riceDesktopClass = isActivePage ? 'after:scale-x-100' : 'after:scale-x-0';

  const desktopLink = `<li><a class="relative text-white/90 hover:text-white transition-colors font-semibold text-[15px] tracking-wide after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#FFE299] ${riceDesktopClass} hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left" href="convivencia-little.html">RICE y Protocolos</a></li>`;
  const mobileLink = `<li><a class="block text-white/90 hover:text-white font-semibold text-[15px]" href="convivencia-little.html">RICE y Protocolos</a></li>`;

  // Apply active/inactive switches for Nosotros
  if (isActivePage) {
    content = content.replace('after:scale-x-100" href="nosotros-little.html">Institución', 'after:scale-x-0" href="nosotros-little.html">Institución');
  }

  // Desktop Navbar Insertion: find first Nosotros occurrence
  const target = 'href="nosotros-little.html">Institución</a></li>';
  let firstIndex = content.indexOf(target);
  if (firstIndex !== -1) {
    const replacement = target + '\n                ' + desktopLink;
    content = content.substring(0, firstIndex) + replacement + content.substring(firstIndex + target.length);
    
    // Mobile Navbar Insertion: find second Nosotros occurrence (searching AFTER the first index + replacement length)
    let secondIndex = content.indexOf(target, firstIndex + replacement.length);
    if (secondIndex !== -1) {
      const replacementMobile = target + '\n                ' + mobileLink;
      content = content.substring(0, secondIndex) + replacementMobile + content.substring(secondIndex + target.length);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully cleaned and updated Navbar in Sede Básica: ${fileName}`);
}

console.log('--- Cleaning and updating Sede Media Navbars ---');
mediaFiles.forEach(file => cleanAndProcessMedia(file));

console.log('\n--- Cleaning and updating Sede Básica Navbars ---');
littleFiles.forEach(file => cleanAndProcessLittle(file));

console.log('\nNavbar updates complete.');
