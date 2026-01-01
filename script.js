const portfolioData = [
    { name: "Codenify", url: "https://codenify.app", desc: "Developer Tools" },
    { name: "Text Codenify", url: "https://text.codenify.app", desc: "Text Utility SaaS" },
    { name: "Color Codenify", url: "https://color.codenify.app", desc: "Color Palette Generator" },
    { name: "LifeCalc", url: "https://lifecalc.app", desc: "Lifestyle Calculator" },
    { name: "Guidify", url: "https://guidify.app", desc: "Guide & Tutorial Platform" },
    { name: "Caption Guidify", url: "https://caption.guidify.app", desc: "Caption Generator" },
    { name: "Viral Guidify", url: "https://viral.guidify.app", desc: "Trend Analyzer" },
    { name: "Pixofy", url: "https://pixofy.app", desc: "Image Processing Tool" },
    { name: "PDF Pixofy", url: "https://pdf.pixofy.app", desc: "PDF Utility SaaS" },
    { name: "Kwintasi Maker", url: "https://kwitansimaker.guidify.app/", desc: "Digital Receipt Generator" },
    { name: "CV Builder", url: "https://cvbuilder.guidify.app/", desc: "Professional Resume Builder" },
    { name: "Quotation Maker Pro", url: "https://quotationmaker.guidify.app/.app", desc: "Business Quotation Tool" },
    { name: "Ship Label Maker", url: "https://shippinglabel.guidify.app/", desc: "Shipping Label Generator" },
    { name: "Payslip Maker", url: "https://shippinglabel.guidify.app/", desc: "Employee Salary Slip Tool" },
    { name: "Invoice Maker Pro", url: "https://invoicemakerpro.netlify.app", desc: "Professional Invoice Generator" },
    { name: "QR Menu Pro", url: "https://menudigital.guidify.app/", desc: "Digital Restaurant Menu" },
    // Menambahkan 2 Website Baru Sesuai Instruksi
    { name: "Calculator HPP", url: "https://smartcalculator.guidify.app//", desc: "Production Cost Calculator" },
    { name: "Surat Jalan Pro", url: "https://suratjalan.guidify.app/", desc: "Professional Delivery Order Tool" }
];

const portfolioContainer = document.getElementById('portfolio-container');

function renderPortfolio() {
    portfolioContainer.innerHTML = ''; // Memastikan container bersih sebelum render
    portfolioData.forEach((item, index) => {
        const imageNumber = index + 1;
        const cardLink = document.createElement('a');
        cardLink.href = item.url;
        cardLink.target = "_blank";
        cardLink.className = 'portfolio-card';
        cardLink.innerHTML = `
            <div class="card-image-container">
                <img src="web${imageNumber}.jpg" alt="${item.name}" class="card-image-file" onerror="this.src='https://via.placeholder.com/400x250?text=Tuka+Official'">
            </div>
            <div class="card-info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <small style="color: #666; margin-top: 10px; display:block;">${item.url.replace('https://', '')}</small>
            </div>
        `;
        portfolioContainer.appendChild(cardLink);
    });
}

// Navigasi Mobile (Burger Menu)
const navSlide = () => {
    const burger = document.querySelector('#burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    navSlide();
});
