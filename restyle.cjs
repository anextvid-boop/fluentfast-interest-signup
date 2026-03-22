const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf-8');

const anchorStart = '<div style="width: 100%; overflow: hidden; margin-top: 4rem; margin-bottom: 4rem; white-space: nowrap; position: relative;">';
const anchorEnd = '</style>';

const startIndex = content.indexOf(anchorStart);
const endIndex = content.indexOf(anchorEnd, startIndex) + anchorEnd.length;

if (startIndex === -1 || endIndex <= anchorEnd.length) {
    console.error("Could not find gallery boundary!");
    process.exit(1);
}

const topImages = [
  'new_concept1.jpg', 'new_concept5.png', 'new_concept3.png', 'media__1774174625139.png',
  'new_concept7.jpg', 'new_concept9.jpg', 'brand1.jpg', 'brand2.jpg'
];

const bottomImages = [
  'new_concept2.jpg', 'new_concept4.png', 'new_concept6.jpg', 'media__1774174625153.png',
  'new_concept8.jpg', 'new_concept10.jpg', 'brand4.jpg', 'brand5.jpg'
];

function generateRowHTML(images) {
  // We duplicate the set to create a seamless infinite scroll loop
  const html = [...images, ...images].map(img => `
        <div class="gallery-card">
          <img src="./public/${img}" loading="lazy" alt="Concept">
        </div>`).join('');
  return html;
}

const galleryHtml = `
    <div style="width: 100%; overflow: hidden; margin-top: 4rem; margin-bottom: 4rem; margin-left: auto; margin-right: auto; white-space: nowrap; position: relative; padding: 2rem 0;">
      <!-- Glowing background behind the gallery to make it pop -->
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; background: radial-gradient(ellipse at center, rgba(89, 86, 214, 0.15) 0%, transparent 70%); z-index: 0; pointer-events: none;"></div>
      
      <!-- Top Row: Sliding Left -->
      <div class="marquee-gallery gallery-fwd" style="display: inline-block; position: relative; z-index: 5;">
${generateRowHTML(topImages)}
      </div>
      
      <br>

      <!-- Bottom Row: Sliding Right -->
      <div class="marquee-gallery gallery-rev" style="display: inline-block; margin-top: 30px; position: relative; z-index: 5;">
${generateRowHTML(bottomImages)}
      </div>
    </div>
    
    <style>
      .marquee-gallery {
        will-change: transform;
      }
      .gallery-fwd {
        animation: scrollGallery 60s linear infinite;
      }
      .gallery-rev {
        animation: scrollGalleryReverse 65s linear infinite;
      }
      .marquee-gallery:hover {
        animation-play-state: paused;
      }
      .gallery-card {
        height: 280px;
        width: 340px;
        border-radius: 24px;
        margin: 0 20px;
        padding: 12px;
        background: rgba(30, 32, 50, 0.6);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 15px 35px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
        display: inline-block;
        vertical-align: middle;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        overflow: hidden;
      }
      /* Soft shine effect */
      .gallery-card::after {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 50%; height: 100%;
        background: linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent);
        transform: skewX(-20deg);
        transition: 0.7s;
      }
      .gallery-card:hover::after {
        left: 200%;
      }
      .gallery-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 14px; /* matches inner padding */
        transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .gallery-card:hover {
        transform: scale(1.08) translateY(-10px) rotate(2deg);
        box-shadow: 0 30px 60px rgba(0,0,0,0.7), 0 0 40px rgba(89, 86, 214, 0.4);
        border-color: rgba(89, 86, 214, 0.8);
        background: rgba(40, 42, 65, 0.8);
        z-index: 20;
      }
      .gallery-card:hover img {
        transform: scale(1.05);
      }
      @keyframes scrollGallery {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes scrollGalleryReverse {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0%); }
      }
      @media (max-width: 768px) {
        .gallery-card {
          height: 200px;
          width: 250px;
          margin: 0 10px;
          padding: 8px;
        }
      }
    </style>`;

let newContent = content.slice(0, startIndex) + galleryHtml + content.slice(endIndex);

fs.writeFileSync('index.html', newContent);
console.log("Gallery updated successfully!");
