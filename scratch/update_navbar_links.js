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

function updateMediaNavbar(fileName) {
  const filePath = path.join(projectDir, fileName);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already injected in the navbar
  if (content.includes('href="convivencia-media.html">RICE</a></li>')) {
    console.log(`Skipping navbar update in: ${fileName} (already injected in navbar)`);
    return;
  }

  // Sede Media link definitions
  const isActivePage = fileName === 'convivencia-media.html';
  const riceDesktopClass = isActivePage ? 'after:scale-x-100' : 'after:scale-x-0';
  
  // RICE link for desktop and mobile
  const desktopLink = `<li><a class="relative text-white/90 hover:text-white transition-colors font-semibold text-[15px] tracking-wide after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#FFE299] ${riceDesktopClass} hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left" href="convivencia-media.html">RICE</a></li>`;
  const mobileLink = `<li><a class="block text-white/90 hover:text-white font-semibold text-[15px]" href="convivencia-media.html">RICE</a></li>`;

  if (isActivePage) {
    // In convivencia-media.html, Nosotros (Institución) should be inactive (after:scale-x-0)
    content = content.replace('after:scale-x-100" href="nosotros-media.html">Institución', 'after:scale-x-0" href="nosotros-media.html">Institución');
  }

  // Locate first occurrence of Nosotros link in desktop navbar
  let firstIndex = content.indexOf('href="nosotros-media.html">Institución</a></li>');
  if (firstIndex !== -1) {
    const target = 'href="nosotros-media.html">Institución</a></li>';
    const replacement = target + '\n                ' + desktopLink;
    
    // Replace only first occurrence of target
    content = content.substring(0, firstIndex) + replacement + content.substring(firstIndex + target.length);
  }

  // Locate occurrence in mobile menu
  let mobileIndex = content.indexOf('href="nosotros-media.html">Institución</a></li>');
  if (mobileIndex !== -1) {
    const target = 'href="nosotros-media.html">Institución</a></li>';
    const replacement = target + '\n                ' + mobileLink;
    content = content.substring(0, mobileIndex) + replacement + content.substring(mobileIndex + target.length);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated Navbar in Media file: ${fileName}`);
}

function updateLittleNavbar(fileName) {
  const filePath = path.join(projectDir, fileName);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already injected in the navbar
  if (content.includes('href="convivencia-little.html">RICE</a></li>')) {
    console.log(`Skipping navbar update in: ${fileName} (already injected in navbar)`);
    return;
  }

  // Sede Básica link definitions
  const isActivePage = fileName === 'convivencia-little.html';
  const riceDesktopClass = isActivePage ? 'after:scale-x-100' : 'after:scale-x-0';
  
  const desktopLink = `<li><a class="relative text-white/90 hover:text-white transition-colors font-semibold text-[15px] tracking-wide after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#FFE299] ${riceDesktopClass} hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left" href="convivencia-little.html">RICE</a></li>`;
  const mobileLink = `<li><a class="block text-white/90 hover:text-white font-semibold text-[15px]" href="convivencia-little.html">RICE</a></li>`;

  if (isActivePage) {
    // In convivencia-little.html, Nosotros (Institución) should be inactive (after:scale-x-0)
    content = content.replace('after:scale-x-100" href="nosotros-little.html">Institución', 'after:scale-x-0" href="nosotros-little.html">Institución');
  }

  // Locate first occurrence of Nosotros link in desktop navbar
  let firstIndex = content.indexOf('href="nosotros-little.html">Institución</a></li>');
  if (firstIndex !== -1) {
    const target = 'href="nosotros-little.html">Institución</a></li>';
    const replacement = target + '\n                ' + desktopLink;
    
    // Replace only first occurrence of target
    content = content.substring(0, firstIndex) + replacement + content.substring(firstIndex + target.length);
  }

  // Locate occurrence in mobile menu
  let mobileIndex = content.indexOf('href="nosotros-little.html">Institución</a></li>');
  if (mobileIndex !== -1) {
    const target = 'href="nosotros-little.html">Institución</a></li>';
    const replacement = target + '\n                ' + mobileLink;
    content = content.substring(0, mobileIndex) + replacement + content.substring(mobileIndex + target.length);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated Navbar in Little file: ${fileName}`);
}

console.log('--- Starting Sede Media Navbar updates ---');
mediaFiles.forEach(file => updateMediaNavbar(file));

console.log('\n--- Starting Sede Básica Navbar updates ---');
littleFiles.forEach(file => updateLittleNavbar(file));

console.log('\nNavbar updates complete.');
