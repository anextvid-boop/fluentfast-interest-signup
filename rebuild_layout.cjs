const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

// 1. Extract successSection
const successStartMarker = '<!-- Success / Starter Words Area -->';
const successEndMarker = '    </section>\n\n    \n\n    <!-- Details At The End -->';

const successStart = content.indexOf(successStartMarker);
let successEnd = content.indexOf('<!-- Details At The End -->');
if(successEnd > 0) {
    // get exactly before details at the end
    successEnd = content.lastIndexOf('</section>', successEnd) + 10;
} else {
    console.log("Could not find Details At The End");
    process.exit(1);
}

const successSectionHTML = content.substring(successStart, successEnd);
let newContent = content.slice(0, successStart) + content.slice(successEnd);

// 2. Insert successSection below formEnd
const formEndMarker = '</details>\n    </section>';
const formEnd = newContent.indexOf(formEndMarker) + formEndMarker.length;
newContent = newContent.slice(0, formEnd) + '\n\n    ' + successSectionHTML + '\n\n' + newContent.slice(formEnd);

// 3. Wrap Gallery + New Text in light-parallax-section
const galleryStartMarker = '<div style="width: 100%; overflow: hidden; margin-top: 4rem; margin-bottom: 4rem; margin-left: auto; margin-right: auto; white-space: nowrap; position: relative; padding: 2rem 0;">';
const galleryStart = newContent.indexOf(galleryStartMarker);

// Find end of gallery (it's closed by a </div> before <style> .marquee-gallery)
const styleTagMarker = '    <style>\n      .marquee-gallery {';
const styleTagStart = newContent.indexOf(styleTagMarker);
let galleryEnd = newContent.indexOf('</style>', styleTagStart) + 8; // end of gallery style block

const newTextSection = `
    <!-- New Text Section -->
    <div class="light-section-text-container" style="max-width: 1000px; margin: 0 auto; text-align: center; padding: 2rem 2rem 5rem 2rem; color: #1a1b41; position: relative; z-index: 10;">
      <h2 style="font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; letter-spacing: 1px; line-height: 1.2; margin-bottom: 1.5rem; text-shadow: 0 4px 15px rgba(255,255,255,0.8);">
        <span style="color: var(--royal-blue);">FLUENT FAST</span> <br>#1 MULTIPLAYER LANGUAGE LAUNCHING PLATFORM
      </h2>
      <p style="font-size: clamp(1.2rem, 3vw, 1.5rem); font-weight: 500; color: #333; margin-bottom: 3rem; line-height: 1.6;">
        Having fun with friends. Learning with friends. Play together. Speak together.
      </p>
      
      <div style="font-family: var(--font-display); font-size: clamp(2.5rem, 7vw, 4.5rem); font-weight: 900; line-height: 1.1; letter-spacing: -1px; text-transform: uppercase; color: #1a1b41;">
        <span style="display: block; opacity: 1;">PLAY.</span>
        <span style="display: block; opacity: 0.9;">LEARN.</span>
        <span style="display: block; opacity: 0.8;">SPEAK.</span>
        <span style="display: block; color: var(--royal-blue); text-shadow: 0 5px 20px rgba(82, 78, 230, 0.2);">TOGETHER.</span>
      </div>
    </div>
`;

// Insert the wrappers
const beforeGallery = `
  </div> <!-- Close original alt-layout -->

  <div class="light-parallax-section">
`;

const afterGallery = `
${newTextSection}
  </div> <!-- Close light-parallax-section -->

  <div class="container alt-layout" style="position: relative;">
`;

newContent = newContent.slice(0, galleryStart) + beforeGallery + newContent.slice(galleryStart, galleryEnd) + '\n' + afterGallery + newContent.slice(galleryEnd);

// 4. Inject CSS accurately before </style> or inside <head>
const cssInjection = `
    .light-parallax-section {
      width: 100%;
      position: relative;
      background: linear-gradient(rgba(255, 255, 255, 0.88), rgba(240, 240, 255, 0.98)), url('./public/brand3.jpg') no-repeat center center fixed;
      background-size: cover;
      box-shadow: 0 0 50px rgba(0,0,0,0.5); /* Strong shadow cast on adjacent dark sections */
      z-index: 5;
    }
  </style>
</head>`;

newContent = newContent.replace('</style>\n</head>', cssInjection);

fs.writeFileSync('index.html', newContent);
console.log("Successfully rebuilt layout safely.");
