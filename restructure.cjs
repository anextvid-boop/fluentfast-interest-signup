const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

// 1. Move successSection above Gallery
const successStartMarker = '<!-- Success / Starter Words Area -->';
const successEndMarker = '    </section>\n\n    <!-- Details At The End -->';

const successStart = content.indexOf(successStartMarker);
let successEnd = content.indexOf(successEndMarker, successStart);

// Handle cases where the end marker is slightly different
if (successEnd === -1) {
    successEnd = content.indexOf('    </section>', successStart);
    successEnd += '    </section>'.length;
} else {
    successEnd += '    </section>'.length;
}

if (successStart === -1 || successEnd === -1) {
    console.error("Could not locate successSection bounds");
    process.exit(1);
}

const successSectionHTML = content.substring(successStart, successEnd);

// Remove successSection from its original place
let newContent = content.slice(0, successStart) + content.slice(successEnd);

// Find the form section to insert successSection right after it
const formEndMarker = '</details>\n    </section>';
const formEnd = newContent.indexOf(formEndMarker) + formEndMarker.length;

newContent = newContent.slice(0, formEnd) + '\n\n    ' + successSectionHTML + newContent.slice(formEnd);


// 2. Break the container into two
// The gallery starts right after the newly inserted successSection.
// We'll find the gallery start, close the current container, and start the new light-parallax-section.

const galleryStartMarker = '<div style="width: 100%; overflow: hidden; margin-top: 4rem; margin-bottom: 4rem; margin-left: auto; margin-right: auto; white-space: nowrap; position: relative; padding: 2rem 0;">';
const galleryStart = newContent.indexOf(galleryStartMarker);

if (galleryStart === -1) {
    console.error("Could not find gallery start marker");
    process.exit(1);
}

const breakHTML = `
  </div> <!-- Close first alt-layout container -->

  <div class="light-parallax-section">
    <div class="container alt-layout" style="padding-top: 2rem; padding-bottom: 0;">
`;

newContent = newContent.slice(0, galleryStart) + breakHTML + '\n    ' + newContent.slice(galleryStart);

// 3. Close the new light-parallax-section at the very end of the file, right before </body> or right where the old container closed.
// The old container closed right before <!-- Floating Pinned WhatsApp Button -->
const containerCloseMarker = '  </div>\n\n  <!-- Floating Pinned WhatsApp Button -->';
const containerClosePos = newContent.indexOf(containerCloseMarker);

if (containerClosePos !== -1) {
    newContent = newContent.slice(0, containerClosePos) + '  </div>\n  </div> <!-- Close light-parallax-section -->\n\n  <!-- Floating Pinned WhatsApp Button -->' + newContent.slice(containerClosePos + containerCloseMarker.length);
}

// 4. Inject new CSS styles into the <head>
const cssInjection = `
  <style>
    .light-parallax-section {
      width: 100%;
      position: relative;
      background: linear-gradient(rgba(255, 255, 255, 0.85), rgba(240, 240, 255, 0.95)), url('./public/brand3.jpg') no-repeat center center fixed;
      background-size: cover;
      color: #1a1b41;
      padding-bottom: 4rem;
      border-top: 2px solid rgba(82, 78, 230, 0.1);
      box-shadow: inset 0 20px 40px rgba(0,0,0,0.05);
    }
    .light-parallax-section .hero-huge-title {
      background: linear-gradient(90deg, var(--royal-blue), var(--deep-navy)) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      text-shadow: 0 5px 20px rgba(82, 78, 230, 0.15) !important;
    }
    .light-parallax-section .hero-lead {
      color: #333 !important;
      font-weight: 500;
    }
    .light-parallax-section .contact-card {
      background: rgba(255, 255, 255, 0.6);
      border-color: rgba(82, 78, 230, 0.15);
      color: #1a1b41;
      box-shadow: 0 10px 40px rgba(0,0,0,0.05);
    }
    .light-parallax-section .contact-card h3 {
      color: var(--royal-blue);
    }
    .light-parallax-section .contact-subtitle {
      color: #555;
    }
    .light-parallax-section .contact-label {
      color: #888;
    }
    .light-parallax-section .contact-link, .light-parallax-section .contact-phone {
      color: var(--royal-blue);
    }
    .light-parallax-section footer a {
      color: #555 !important;
    }
    .light-parallax-section footer a:hover {
      color: var(--royal-blue) !important;
    }
    .light-parallax-section .tagline-pill {
      border-color: var(--royal-blue);
      color: var(--royal-blue);
      background: rgba(82, 78, 230, 0.1);
    }
  </style>
</head>`;

newContent = newContent.replace('</head>', cssInjection);

fs.writeFileSync('index.html', newContent);
console.log("Restructured layout with light-parallax successfully.");
