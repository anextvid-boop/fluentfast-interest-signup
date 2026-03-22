const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const galleryCSS = `
    @keyframes slowPan {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .concept-track {
      display: flex;
      gap: 2rem;
      width: max-content;
      animation: slowPan 40s linear infinite;
      padding: 1rem 0;
    }
    .concept-track:hover {
      animation-play-state: paused;
    }
    .concept-card {
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 15px 35px rgba(0,0,0,0.5);
      border: 2px solid rgba(255,255,255,0.1);
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .concept-card:hover {
      transform: scale(1.08) translateY(-10px) rotate(0deg) !important;
      z-index: 10;
      box-shadow: 0 20px 40px rgba(82, 78, 230, 0.6);
      border-color: rgba(82, 78, 230, 0.8);
    }
`;

html = html.replace('</style>', galleryCSS + '\n  </style>');
fs.writeFileSync('index.html', html);
console.log('Added CSS');
