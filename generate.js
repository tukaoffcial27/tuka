const fs = require('fs');
const path = require('path');

// 1. Ambil data kota dan template
const cities = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
const template = fs.readFileSync('template.html', 'utf8');

// 2. Siapkan folder tujuan untuk Vercel
const publicDir = path.join(__dirname, 'public');
const waDir = path.join(publicDir, 'wa');

// Buat foldernya jika belum ada
if (!fs.existsSync(waDir)) {
    fs.mkdirSync(waDir, { recursive: true });
}

// 3. DAFTAR FILE YANG HARUS DISALIN (Agar Portfolio & SEO Muncul)
// Menambahkan script.js dan robots.txt ke dalam daftar
const filesToCopy = ['style.css', 'logo.png', 'index.html', 'script.js', 'robots.txt'];

// Otomatis mencari dan menyalin semua gambar web1.jpg hingga web18.jpg
for (let i = 1; i <= 18; i++) {
    const imgName = `web${i}.jpg`;
    if (fs.existsSync(imgName)) {
        filesToCopy.push(imgName);
    }
}

console.log("🚀 Menyalin file aset ke folder public...");
filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(publicDir, file));
        console.log(`✅ Berhasil menyalin: ${file}`);
    }
});

// 4. Cetak 465 halaman kota & Siapkan Sitemap
console.log("📝 Mencetak halaman kota dan menyiapkan sitemap...");
let sitemapEntries = '';
const baseUrl = 'https://tuka.guidify.app';

cities.forEach((data) => {
    // Ganti {{city}} dengan nama kota di template
    let content = template.replace(/{{city}}/g, data.city);
    const filePath = path.join(waDir, `${data.slug}.html`);
    fs.writeFileSync(filePath, content);
    
    // Tambah entri ke sitemap
    sitemapEntries += `  <url>\n    <loc>${baseUrl}/wa/${data.slug}.html</loc>\n    <priority>0.8</priority>\n  </url>\n`;
});

// 5. Tulis File sitemap.xml
const fullSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>
${sitemapEntries}
</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), fullSitemap);

console.log(`✨ SELESAI! Portfolio dan 465 halaman sudah siap di folder /public/`);