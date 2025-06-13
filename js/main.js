// main.js

document.addEventListener('DOMContentLoaded', () => {
  // --- Element & State Definitions ---
  const slides = document.querySelectorAll('.slide');
  const progressBar = document.getElementById('progress-bar');
  const navLeft = document.getElementById('nav-left');
  const navRight = document.getElementById('nav-right');
  const navArrows = document.querySelectorAll('.nav-arrow');
  let currentSlide = 0;
  let s4_anim_step = 0;

  // SVG Icon strings for better maintainability
  const SVG_ARROW_LEFT_DARK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  const SVG_ARROW_RIGHT_DARK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
  const SVG_ARROW_LEFT_LIGHT = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  const SVG_ARROW_RIGHT_LIGHT = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';

  // --- Core Functions ---
  function setupLogoCarousel() {
    const track = document.querySelector('.logo-track');
    if (track) {
      const originalSet = track.querySelector('.logo-set');
      if (originalSet) {
        const clone = originalSet.cloneNode(true);
        track.appendChild(clone);
      }
    }
  }

  function resetSlide2QuoteAnimation() {
    const quote = document.getElementById('slide2-quote');
    if (quote) {
      quote.classList.add('opacity-0');
      quote.classList.remove('opacity-100');
    }
  }

  function resetSlide3ChatAnimation() {
    const placeholder = document.getElementById('placeholder-text');
    const typedTextEl = document.getElementById('typed-text');
    const cursor = document.getElementById('typing-cursor');
    const userBubble = document.getElementById('user-prompt-bubble');
    const userBubbleContainer = document.getElementById('user-prompt-bubble-container');
    const aiBubbleContainer = document.getElementById('ai-response-bubble-container');

    if (typedTextEl) typedTextEl.textContent = '';
    if (placeholder) placeholder.style.display = 'inline';
    if (cursor) {
      cursor.style.display = 'inline-block';
      cursor.classList.add('opacity-0');
    }
    if (userBubble) userBubble.textContent = '';
    if (userBubbleContainer) userBubbleContainer.classList.add('opacity-0', 'translate-y-4');
    if (aiBubbleContainer) aiBubbleContainer.classList.add('opacity-0', 'translate-y-4');
  }

  function resetSlide4ChatAnimation() {
    s4_anim_step = 0;
    const elementsToReset = [
      { placeholder: 's4-basic-placeholder', typedText: 's4-basic-typed-text', cursor: 's4-basic-cursor', bubble: 's4-basic-bubble', bubbleContainer: 's4-basic-bubble-container' },
      { placeholder: 's4-tcrei-placeholder', typedText: 's4-tcrei-typed-text', cursor: 's4-tcrei-cursor', bubble: 's4-tcrei-bubble', bubbleContainer: 's4-tcrei-bubble-container' }
    ];
    elementsToReset.forEach(group => {
      const placeholder = document.getElementById(group.placeholder);
      const typedText = document.getElementById(group.typedText);
      const cursor = document.getElementById(group.cursor);
      const bubble = document.getElementById(group.bubble);
      const bubbleContainer = document.getElementById(group.bubbleContainer);
      
      if (placeholder) placeholder.style.display = 'inline';
      if (typedText) typedText.textContent = '';
      if (cursor) {
        cursor.classList.add('opacity-0');
        cursor.style.display = 'inline-block';
      }
      if (bubble) bubble.textContent = '';
      if (bubbleContainer) bubbleContainer.classList.add('opacity-0', 'translate-y-4');
    });
  }

  function updateProgressBar() {
    const percent = ((currentSlide) / (slides.length - 1)) * 100;
    if (progressBar) progressBar.style.width = percent + '%';
  }

  function showSlide(newIndex) {
    const oldIndex = currentSlide;
    if (oldIndex !== newIndex) {
      const oldSlide = slides[oldIndex];
      if (oldSlide && oldSlide.classList.contains('active')) {
        if (oldIndex === 1) resetSlide2QuoteAnimation();
        else if (oldIndex === 2) resetSlide3ChatAnimation();
        else if (oldIndex === 3) resetSlide4ChatAnimation();
      }
    }
    currentSlide = newIndex;
    slides.forEach((slide) => slide.classList.remove('active'));
    const targetSlide = slides[newIndex];
    if (targetSlide) {
      targetSlide.classList.add('active');
      updateNavTheme(targetSlide);
    }
    updateProgressBar();
  }

  function updateNavTheme(activeSlide) {
    const theme = activeSlide.getAttribute('data-theme');
    navArrows.forEach(nav => {
      if (theme === 'dark') {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        nav.style.color = 'rgba(255, 255, 255, 0.4)';
        nav.innerHTML = nav.id === 'nav-left' ? SVG_ARROW_LEFT_DARK : SVG_ARROW_RIGHT_DARK;
      } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        nav.style.color = 'rgba(0, 0, 0, 0.4)';
        nav.innerHTML = nav.id === 'nav-left' ? SVG_ARROW_LEFT_LIGHT : SVG_ARROW_RIGHT_LIGHT;
      }
    });
  }

  // --- Arrow Fade Functions ---
  let navFadeTimeout;
  function showArrows() {
    navArrows.forEach(arrow => arrow.classList.remove('nav-arrow-hidden'));
    document.body.classList.remove('hide-cursor');
  }
  function hideArrows() {
    navArrows.forEach(arrow => arrow.classList.add('nav-arrow-hidden'));
    document.body.classList.add('hide-cursor');
  }
  function resetArrowFadeTimer() {
    showArrows();
    if (navFadeTimeout) clearTimeout(navFadeTimeout);
    navFadeTimeout = setTimeout(hideArrows, 2000);
  }

  // --- Event Listeners ---
  if (navRight) navRight.addEventListener('click', () => showSlide((currentSlide + 1) % slides.length));
  if (navLeft) navLeft.addEventListener('click', () => showSlide((currentSlide - 1 + slides.length) % slides.length));

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'arrowright') showSlide((currentSlide + 1) % slides.length);
    else if (key === 'arrowleft') showSlide((currentSlide - 1 + slides.length) % slides.length);
    else if (key === 'q') {
      const slide2 = slides[1];
      const quote = document.getElementById('slide2-quote');
      if (slide2 && quote && slide2.classList.contains('active')) {
        quote.classList.remove('opacity-0');
        quote.classList.add('opacity-100');
      }
    } else if (key === 'p') {
      const slide3 = slides[2];
      const slide4 = slides[3];

      if (slide3 && slide3.classList.contains('active')) {
        const userBubble = document.getElementById('user-prompt-bubble');
        if (userBubble && userBubble.textContent !== '') return;
        const placeholder = document.getElementById('placeholder-text');
        const typedTextEl = document.getElementById('typed-text');
        const cursor = document.getElementById('typing-cursor');
        const userBubbleContainer = document.getElementById('user-prompt-bubble-container');
        const aiBubbleContainer = document.getElementById('ai-response-bubble-container');
        const promptToType = "what is a prompt?";
        if (placeholder) placeholder.style.display = 'none';
        if (cursor) cursor.classList.remove('opacity-0');
        let i = 0;
        function typeWriter() {
          if (i < promptToType.length) {
            typedTextEl.textContent += promptToType.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
          } else {
            if (cursor) cursor.style.display = 'none';
            setTimeout(() => {
              typedTextEl.textContent = '';
              if (placeholder) placeholder.style.display = 'inline';
            }, 800);
            setTimeout(() => {
              if (userBubble) userBubble.textContent = promptToType;
              if (userBubbleContainer) userBubbleContainer.classList.remove('opacity-0', 'translate-y-4');
            }, 500);
            setTimeout(() => {
              if (aiBubbleContainer) aiBubbleContainer.classList.remove('opacity-0', 'translate-y-4');
            }, 1500);
          }
        }
        typeWriter();
      }

      if (slide4 && slide4.classList.contains('active')) {
        const typeWriter = (elements, textToType, callback) => {
          const { placeholder, typedText, cursor, bubble, bubbleContainer } = elements;
          if (placeholder) placeholder.style.display = 'none';
          if (cursor) cursor.classList.remove('opacity-0');
          let i = 0;
          function type() {
            if (i < textToType.length) {
              typedText.textContent += textToType.charAt(i);
              i++;
              setTimeout(type, 50);
            } else {
              if (cursor) cursor.style.display = 'none';
              setTimeout(() => {
                typedText.textContent = '';
                if (placeholder) placeholder.style.display = 'inline';
              }, 800);
              setTimeout(() => {
                if (bubble) bubble.textContent = textToType;
                if (bubbleContainer) bubbleContainer.classList.remove('opacity-0', 'translate-y-4');
              }, 500);
              if (callback) callback();
            }
          }
          type();
        };

        if (s4_anim_step === 0) {
          s4_anim_step = 0.5;
          const elements = {
            placeholder: document.getElementById('s4-basic-placeholder'),
            typedText: document.getElementById('s4-basic-typed-text'),
            cursor: document.getElementById('s4-basic-cursor'),
            bubble: document.getElementById('s4-basic-bubble'),
            bubbleContainer: document.getElementById('s4-basic-bubble-container')
          };
          const textToType = '"Write about our new product."';
          typeWriter(elements, textToType, () => { s4_anim_step = 1; });
        } else if (s4_anim_step === 1) {
          s4_anim_step = 1.5;
          const elements = {
            placeholder: document.getElementById('s4-tcrei-placeholder'),
            typedText: document.getElementById('s4-tcrei-typed-text'),
            cursor: document.getElementById('s4-tcrei-cursor'),
            bubble: document.getElementById('s4-tcrei-bubble'),
            bubbleContainer: document.getElementById('s4-tcrei-bubble-container')
          };
          const textToType = '"You are a technical writer at Flash. Write a brief overview of our new analytics dashboard for a client-facing knowledge base article. Focus on key benefits for enterprise users and include a clear call-to-action for scheduling a demo."';
          typeWriter(elements, textToType, () => { s4_anim_step = 2; });
        }
      }
    }
  });

  // Mouse movement for arrow fading
  document.addEventListener('mousemove', resetArrowFadeTimer);

  // --- Initial Setup Calls ---
  setupLogoCarousel();
  showSlide(currentSlide);
  showArrows();
});