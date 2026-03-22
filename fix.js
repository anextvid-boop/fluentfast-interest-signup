const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('<title>INVESTOR | FluentFast</title>', '<title>WAITLIST | FluentFast</title>');

html = html.replace(
  /<div class="brand-tagline">[\s\S]*?<\/div>/,
  `<div class="brand-tagline">
          <span class="inv-char">W</span><span class="inv-char">A</span><span class="inv-char">I</span><span class="inv-char">T</span><span class="inv-char">L</span><span class="inv-char">I</span><span class="inv-char">S</span><span class="inv-char">T</span>
        </div>`
);

html = html.replace(
  '<span>Expand Details</span>',
  '<span>Learn More</span>'
);

html = html.replace(
  '<span>Register Interest</span>',
  '<span>Join Waitlist</span>'
);

html = html.replace(
  /Register Interest/g,
  'Join Waitlist'
);

html = html.replace(
  /Send Interest/g,
  'Join Waitlist'
);

const newPitchBox = `    <section class="form-section" id="pitchBox">
      <div class="message-section intro-visible">
        <p>
          <strong>FluentFast</strong><br>
          The Future of Language Learning.<br>
          <br>
          We are redefining how people learn languages. Join the waitlist to be part of our early community.<br>
          <br>
          Get access to exclusive speed learning classes, explore efficient learning strategies, and be the first to experience our upcoming multiplayer language app.
        </p>
      </div>

      <div class="message-section accordion">
        <div class="accordion-header">
          <h3>Speed Learning Classes</h3>
          <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="accordion-content">
          <p style="margin-bottom: 0.8rem;">Discover powerful strategies to accelerate language acquisition.</p>
          <p style="margin-bottom: 0.8rem;">We explore cognitive techniques and meta-learning principles to help you absorb information faster and more effectively.</p>
          <p>Stop wasting time on slow methods and unlock your true learning potential.</p>
        </div>
      </div>

      <div class="message-section accordion">
        <div class="accordion-header">
          <h3>The Multiplayer App</h3>
          <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="accordion-content">
          <p style="margin-bottom: 0.8rem;">A multiplayer language learning app coming soon.</p>
          <p style="margin-bottom: 0.8rem;">Encouraging, fun, and built to play with friends.</p>
          <p style="margin-bottom: 1.5rem;">Aiming to create a rich, immersive language learning environment through peer-to-peer interactions.</p>

          <p style="margin-bottom: 0.8rem;">Immersion is the best form of learning... but what if you can't travel?</p>
          <p style="margin-bottom: 1.5rem;">This app brings the immersive experience directly to you.</p>

          <p style="margin-bottom: 0.8rem;">When learning with friends, you practice with friends... Learning
            <strong>fluent faster</strong> together.</p>
        </div>
      </div>

      <div class="message-section isolate-quote accordion">
        <div class="accordion-header">
          <h3>Join the Waitlist</h3>
          <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="accordion-content">
          <div style="font-size: 0.95rem; margin-top: 0.5rem; color: #ffffff; background: rgba(255, 255, 255, 0.08); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.2); line-height: 1.6; text-align: left;">
            <p style="margin-bottom: 0.75rem;">We want to see who is supportive of the project before it fully launches.</p>
            <p style="margin-bottom: 0.75rem;">By signing up, you will get updates for what is different and what's going to be happening in the future leading forward.</p>
            <p style="margin-bottom: 0;">Try the form below to register your interest and join the waiting list!</p>
          </div>
        </div>
      </div>

      <button class="fast-close-btn" id="fastClosePitch">
        CLOSE DETAILS
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
          stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </section>`;
html = html.replace(/<section class="form-section" id="pitchBox">[\s\S]*?<\/section>/, newPitchBox);

const newFormHeader = `<div class="form-header">
        <img src="./public/koala_meditating.png" loading="lazy" class="koala-form-guide" alt="Koala meditating">
        <h2>Join Waitlist</h2>
        <p>Sign up to show your support and get exclusive updates about our speed learning classes and the multiplayer app launch.</p>
      </div>`;
html = html.replace(/<div class="form-header">\s*<img[^>]*>\s*<h2>[^<]*<\/h2>\s*<p>.*?<\/p>\s*<\/div>/, newFormHeader);

// Replace form group for "amount" and "background"
const newFormFields = `        <div class="form-group full-width">
          <label for="background">What languages are you learning? (Optional)</label>
          <textarea id="background" name="background" rows="3" placeholder="Tell us about your learning goals or what interests you about FluentFast..."></textarea>
        </div>`;
html = html.replace(/<div class="form-group">\s*<label for="amount">Investment Tier<\/label>[\s\S]*?<\/textarea>\s*<\/div>/, newFormFields);

const newTiers = `    <div class="tiers-container">
      <!-- Classes Tier -->
      <div class="tier-card" id="tierClasses">
        <div class="tier-name">Speed Classes</div>
        <div class="tier-price" style="font-size: 2.2rem;">COMING SOON</div>

        <button class="tier-expand-btn">
          <span>DETAILS</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div class="tier-details">
          <div class="theme-box theme-learn">ACCELERATED LEARNING</div>
          <ul class="execution-list">
            <li>Learn speed language acquisition strategies.</li>
            <li>Master cognitive techniques and mnemonics.</li>
            <li>Stop wasting time and learn efficiently.</li>
          </ul>
        </div>

        <button class="invest-button pulse-btn" onclick="document.getElementById('toggleInterest').click()">JOIN WAITLIST</button>
      </div>

      <!-- App Tier -->
      <div class="tier-card" id="tierApp">
        <div class="tier-name">Multiplayer App</div>
        <div class="tier-price" style="font-size: 2.2rem;">IN DEVELOPMENT</div>

        <button class="tier-expand-btn">
          <span>DETAILS</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div class="tier-details">
          <div class="theme-box theme-fast">PLAY & LEARN</div>
          <ul class="execution-list">
            <li>A fun, encouraging environment.</li>
            <li>Immersive peer-to-peer gameplay.</li>
            <li>Practice and become fluent faster together.</li>
          </ul>
        </div>

        <button class="invest-button pulse-btn" onclick="document.getElementById('toggleInterest').click()">JOIN WAITLIST</button>
      </div>

      <!-- Community Tier -->
      <div class="tier-card" id="tierCommunity">
        <div class="tier-name">Early Access</div>
        <div class="tier-price" style="font-size: 2.2rem;">FREE</div>

        <button class="tier-expand-btn">
          <span>DETAILS</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div class="tier-details">
          <div class="theme-box theme-ultimate">SUPPORT US</div>
          <ul class="execution-list">
            <li>Receive exclusive project updates.</li>
            <li>Shape the future of language learning.</li>
            <li>Be the first to know when we launch.</li>
          </ul>
        </div>

        <button class="invest-button pulse-btn" onclick="document.getElementById('toggleInterest').click()">JOIN WAITLIST</button>
      </div>
    </div>`;

html = html.replace(/<div class="tiers-container">[\s\S]*?<\/div>\s*<div class="brand-gallery" id="stackedGallery">/, newTiers + '\n\n    <div class="brand-gallery" id="stackedGallery">');

html = html.replace('<!-- Investment Details Modal -->', '<!-- removed modal -->');
html = html.replace(/<div id="investModalOverlay" class="modal-overlay hidden">[\s\S]*?<\/div>\s*<\/div>/, '');

html = html.replace('<h3>SPEAK TO THE FOUNDER</h3>', '<h3>CONTACT US</h3>');
html = html.replace('<p class="contact-subtitle">Skip the bureaucracy. Direct line to the execution core.</p>', '<p class="contact-subtitle">Have questions or ideas? Get in touch directly.</p>');
// ensure fluentfastkoalas is in there
html = html.replace('fluentfastkoalas@gmail.com', 'fluentfastkoalas@gmail.com');

// JS modifications for the form submit
let jsSubmissionLogic = `    investorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = investorForm.querySelector('.submit-button');
      const originalText = submitBtn.innerText;

      // Polish: Loading State
      submitBtn.disabled = true;
      submitBtn.innerText = 'SENDING...';
      submitBtn.style.opacity = '0.7';

      // Submit form data using fetch (or custom endpoint later)
      // Here just simulate success
      setTimeout(() => {
        submitBtn.innerText = '✓ SENT SUCCESSFULLY';
        submitBtn.style.background = 'var(--brand-light)';
        submitBtn.style.opacity = '1';

        setTimeout(() => {
          alert('You have joined the waitlist! We will contact you soon.');
          investorForm.reset();

          // Return to original state
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
          submitBtn.style.background = '';

          // Collapse form
          formSection.classList.remove('expanded');
          toggleBtn.classList.remove('active');
          toggleBtn.querySelector('span').innerText = 'Join Waitlist';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
      }, 1500);
    });

    // Investment Flow Modal Logic Removed
`;
html = html.replace(/investorForm\.addEventListener\('submit', \(e\) => {[\s\S]*?(\/\/ --- NEW PREMIUM UI FEATURES ---)/, jsSubmissionLogic + '\n$1');

fs.writeFileSync('index.html', html);
console.log('Modified index.html');
