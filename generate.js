const fs = require('fs');
const path = require('path');

const cities = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
const template = fs.readFileSync('template.html', 'utf8');

const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

const filesToCopy = [
    'index.html', 
    'robots.txt',
    'vercel.json',
    'preview-invoice.jpg',
    'preview-invoice1.jpg',
    'preview-invoice2.jpg'
];

filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(publicDir, file));
    }
});

let sitemapEntries = '';
const baseUrl = 'https://tuka.guidify.app';

cities.forEach((data) => {
    let content = template.replace(/{{city}}/g, data.city);
    // SEKARANG FILE DISIMPAN LANGSUNG DI FOLDER PUBLIC
    fs.writeFileSync(path.join(publicDir, `${data.slug}.html`), content);
    sitemapEntries += `  <url>\n    <loc>${baseUrl}/${data.slug}</loc>\n    <priority>0.8</priority>\n  </url>\n`;
});

const fullSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><priority>1.0</priority></url>
${sitemapEntries}
</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), fullSitemap);
console.log(`✨ Sukses! 465 Halaman Tuka Official siap di root folder.`);