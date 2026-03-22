// style.css is already loaded via standard HTML <link> natively.

// Scroll fade effect removed to protect pitch area readability

// Subtle hover animation for cards using mouse position
let cards = null;

function initCardHover() {
    if (!cards) cards = document.querySelectorAll('.tier-card, .info-card, .inline-form-section');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}


// UI Sound Effects
// Mathematical Synthesizer using Web Audio API for a perfect premium click
let audioCtx;

function initAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

const clickAudio = new Audio('./public/sounds/click.mp3');
clickAudio.volume = 0.5;

function playClickSound() {
    try {
        clickAudio.currentTime = 0;
        clickAudio.play().catch(e => console.log('Audio autoplay blocked', e));
    } catch (e) {
        // Fail silently
    }
}

// Attach sound to interactive elements
function initializeObservers() {
    const interactables = document.querySelectorAll('button, a.invest-button, summary, .phrase-card');
    interactables.forEach(el => {
        el.addEventListener('mousedown', playClickSound);
    });
    
    // Premium Typography Text Splitting
    const premiumTexts = document.querySelectorAll('.premium-text-reveal');
    premiumTexts.forEach(el => {
        const text = el.innerText.trim();
        el.innerHTML = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'premium-char';
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${i * 0.05}s`;
            el.appendChild(span);
        });
    });

    const premiumTextObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('premium-on');
            }
        });
    }, { threshold: 0.1 });

    premiumTexts.forEach(el => premiumTextObserver.observe(el));
    
    // Setup Intersection Observer for Invest buttons (to expand nicely)
    const btnObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });
    
    const investBtns = document.querySelectorAll('.invest-button');
    investBtns.forEach(btn => btnObserver.observe(btn));
    
    // Setup Intersection Observer for Form loader buttons (Expand Details / Register Interest)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const formBtnObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            } else {
                entry.target.classList.remove('appear');
            }
        });
    }, observerOptions);

    const formBtns = document.querySelectorAll('.form-loader-btn');
    formBtns.forEach(btn => formBtnObserver.observe(btn));
    
    // Setup generic scroll pops for cards and inner text
    const animTargets = document.querySelectorAll('.tier-card, .tier-name, .tier-price, .tier-expand-btn, .theme-box, .execution-list li');
    animTargets.forEach(el => formBtnObserver.observe(el));
    
    // Animate Title natively upon sight!
    const titleWordsStatic = document.querySelectorAll('.word-group');
    const wordObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('word-on');
            }
        });
    }, { threshold: 0.2 });
    titleWordsStatic.forEach(w => wordObserver.observe(w));
    
    initCardHover();
    
    // Initialize scroll scale manually upon final load
    updateScrollScale();

    // Language Translation Logic for Starter Phrases
    const phraseTranslations = {
      "English": ["Hello.", "My name is _____", "Can you help, please.", "What is that called?", "Can you repeat it?", "Can you say it again?", "Say it slower.", "Is this correct?", "Can you correct me", "Thanks"],
      "Spanish": ["Hola.", "Me llamo _____", "Puedes ayudarme, por favor.", "¿Cómo se llama eso?", "¿Puedes repetirlo?", "¿Puedes decirlo de nuevo?", "Dilo más despacio.", "¿Es esto correcto?", "¿Puedes corregirme?", "Gracias"],
      "French": ["Bonjour.", "Je m'appelle _____", "Pouvez-vous m'aider, s'il vous plaît.", "Comment ça s'appelle?", "Pouvez-vous répéter?", "Pouvez-vous le redire?", "Parlez plus lentement.", "Est-ce correct?", "Pouvez-vous me corriger?", "Merci"],
      "German": ["Hallo.", "Ich heiße _____", "Können Sie bitte helfen.", "Wie heißt das?", "Können Sie das wiederholen?", "Können Sie das noch einmal sagen?", "Sagen Sie es langsamer.", "Ist das richtig?", "Können Sie mich korrigieren", "Danke"],
      "Italian": ["Ciao.", "Mi chiamo _____", "Puoi aiutarmi, per favore.", "Come si chiama quello?", "Puoi ripetere?", "Puoi dirlo di nuovo?", "Dillo più lentamente.", "È corretto?", "Puoi correggermi?", "Grazie"],
      "Portuguese": ["Olá.", "Meu nome é _____", "Você pode me ajudar, por favor.", "Como se chama isso?", "Você pode repetir?", "Você pode dizer de novo?", "Fale mais devagar.", "Isso está correto?", "Você pode me corrigir?", "Obrigado"],
      "Mandarin": ["你好。", "我的名字是 _____", "请问你能帮忙吗。", "那个叫什么？", "你能重复一遍吗？", "你能再说一遍吗？", "说慢一点。", "这正确吗？", "你能纠正我吗", "谢谢"],
      "Japanese": ["こんにちは。", "私の名前は_____です", "手伝ってくれませんか。", "あれは何と呼ばれていますか？", "もう一度繰り返してくれますか？", "もう一度言ってくれますか？", "もっとゆっくり言ってください。", "これは正しいですか？", "私を訂正してくれますか", "ありがとう"],
      "Korean": ["안녕하세요.", "제 이름은 _____입니다", "도와주시겠어요.", "저것은 무엇이라고 부르나요?", "다시 반복해주시겠어요?", "다시 한번 말씀해주시겠어요?", "더 천천히 말씀해주세요.", "이것이 맞나요?", "저를 고쳐주시겠어요", "감사합니다"],
      "Arabic": ["مرحبا.", "اسمي _____", "هل يمكنك المساعدة من فضلك.", "ماذا يسمى هذا؟", "هل يمكنك تكرار ذلك؟", "هل يمكنك قول ذلك مرة أخرى؟", "قلها ببطء أكثر.", "هل هذا صحيح؟", "هل يمكنك تصحيحي", "شكرا"],
      "Russian": ["Здравствуйте.", "Меня зовут _____", "Вы не могли бы помочь, пожалуйста.", "Как это называется?", "Вы не могли бы повторить?", "Вы не могли бы сказать это еще раз?", "Говорите медленнее.", "Это правильно?", "Вы не могли бы меня исправить", "Спасибо"],
      "Hindi": ["नमस्ते।", "मेरा नाम _____ है", "क्या आप मदद कर सकते हैं, कृपया।", "उसे क्या कहते हैं?", "क्या आप इसे दोहरा सकते हैं?", "क्या आप इसे फिर से कह सकते हैं?", "इसे धीमे बोलें।", "क्या यह सही है?", "क्या आप मुझे सही कर सकते हैं", "धन्यवाद"]
    };

    const learnLangSelect = document.getElementById('learn-lang');
    if (learnLangSelect) {
        learnLangSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            const newPhrases = phraseTranslations[selectedLang];
            if (newPhrases) {
                const phraseTexts = document.querySelectorAll('.phrase-card .phrase-text');
                phraseTexts.forEach((el, index) => {
                    if (newPhrases[index]) {
                        // Add a subtle fade effect for the text change
                        el.style.opacity = 0;
                        setTimeout(() => {
                            el.innerText = newPhrases[index];
                            el.style.opacity = 1;
                        }, 200);
                    }
                });
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeObservers);
} else {
    initializeObservers();
}

// Premium Scroll Parallax for Tier Cards

function updateScrollScale() {
    
    const windowCenter = window.innerHeight / 2;
    if (cards) {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            
        const maxDistance = window.innerHeight / 1.2;
            const distance = Math.abs(windowCenter - cardCenter);
            
            let scale = 1 - (distance / maxDistance) * 0.15; 
            scale = Math.max(0.85, Math.min(1, scale)); 
            
            card.style.setProperty('--scroll-scale', scale);
        });
    }
}
            
let mainTicking = false;
const scrollHandler = () => {
  if (!mainTicking) {
    window.requestAnimationFrame(() => {
      updateScrollScale();
      mainTicking = false;
    });
    mainTicking = true;
  }
};
window.addEventListener('scroll', scrollHandler, { passive: true });
window.addEventListener('resize', scrollHandler, { passive: true });
