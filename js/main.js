// main.js

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  // Progress Bar
  const progressBar = document.getElementById('progress-bar');
  function updateProgressBar() {
    const percent = ((currentSlide) / (slides.length - 1)) * 100;
    if (progressBar) progressBar.style.width = percent + '%';
  }

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    const targetSlide = slides[index];
    if (targetSlide) {
      targetSlide.classList.add('active');
      updateNavTheme(targetSlide);
    }
    updateProgressBar();
  }

  function updateNavTheme(activeSlide) {
    const theme = activeSlide.getAttribute('data-theme');
    const navs = document.querySelectorAll('.nav-arrow');
    if (theme === 'dark') {
      navs.forEach(nav => {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        nav.style.color = 'rgba(255, 255, 255, 0.4)';
        nav.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
        if (nav.id === 'nav-right') nav.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
      });
    } else {
      navs.forEach(nav => {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        nav.style.color = 'rgba(0, 0, 0, 0.4)';
        nav.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
        if (nav.id === 'nav-right') nav.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
      });
    }
  }

  // Keyboard & Button Navigation
  const navLeft = document.getElementById('nav-left');
  const navRight = document.getElementById('nav-right');
  navRight.addEventListener('click', () => { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); });
  navLeft.addEventListener('click', () => { currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); }
    else if (e.key === 'ArrowLeft') { currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); }
  });

  // ---- Gemini Chat Demo (Slide 5) ----
  // Note: For local/offline demo, Gemini API is mocked.
  const chatContainer = document.getElementById('gemini-chat');
  const generateButton = document.getElementById('generate-button');
  const suggestButton = document.getElementById('suggest-button');
  const promptInput = document.getElementById('prompt-input');
  const suggestionsContainer = document.getElementById('suggestions-container');
  const clearChatButton = document.getElementById('clear-chat');

  async function callGeminiAPI(prompt) {
    // --- Display User Message ---
    const userMessageHTML = `
      <div class="user-message flex justify-end items-start gap-3">
        <div class="chat-bubble text-lg">${prompt}</div>
        <div class="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
      </div>`;
    chatContainer.innerHTML += userMessageHTML;
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // --- Display AI Loading State ---
    const loadingHTML = `
      <div class="ai-message ai-loading flex justify-start items-start gap-3">
        <div class="w-10 h-10 rounded-full bg-gray-800 flex justify-center items-center flex-shrink-0"><svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg></div>
        <div class="chat-bubble text-lg"><span class="typing-cursor"></span></div>
      </div>`;
    chatContainer.innerHTML += loadingHTML;
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // --- Simulated Gemini Response (replace this with real API for production) ---
    await new Promise(r => setTimeout(r, 1200)); // Simulate API delay
    const mockResponses = [
      "That's an interesting prompt! Try adding more detail for an even richer answer.",
      "Here's a short summary: Prompt engineering is all about structuring inputs for optimal AI output.",
      "Great question! Think about task, context, references, and evaluating/iterating as you prompt."
    ];
    let text = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    // --- Display AI Response ---
    const loadingBubble = chatContainer.querySelector('.ai-loading');
    if (loadingBubble) loadingBubble.remove(); // Remove loading bubble
    const aiMessageHTML = `
      <div class="ai-message flex justify-start items-start gap-3">
        <div class="w-10 h-10 rounded-full bg-gray-800 flex justify-center items-center flex-shrink-0"><svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg></div>
        <div class="chat-bubble text-lg">${text.replace(/\n/g, '<br>')}</div>
      </div>`;
    chatContainer.innerHTML += aiMessageHTML;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  async function getSuggestions() {
    suggestButton.disabled = true;
    suggestButton.textContent = "Getting suggestions...";
    // Simulate suggestion fetch
    await new Promise(r => setTimeout(r, 900));
    const suggestions = [
      "Write a poem about a robot learning to dream.",
      "Explain quantum physics to a 5-year-old.",
      "Create a recipe for a dish that doesn't exist."
    ];
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
      const button = document.createElement('button');
      button.className = 'text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg transition-colors';
      button.textContent = suggestion;
      button.onclick = () => {
        promptInput.value = suggestion;
        generateButton.click();
      };
      suggestionsContainer.appendChild(button);
    });
    suggestButton.disabled = false;
    suggestButton.textContent = "✨ Suggest Prompts";
  }

  generateButton?.addEventListener('click', () => {
    const prompt = promptInput.value.trim();
    if (prompt) {
      callGeminiAPI(prompt);
      promptInput.value = '';
      suggestionsContainer.innerHTML = '';
    }
  });
  promptInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      generateButton.click();
    }
  });
  suggestButton?.addEventListener('click', getSuggestions);

  clearChatButton?.addEventListener('click', () => {
    chatContainer.innerHTML = '';
  });

  // ---- TCREI Tabs Logic ----
  const tcreiTabs = document.querySelectorAll('.tcrei-tab');
  const tcreiPanes = document.querySelectorAll('.tcrei-pane');
  tcreiTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      tcreiTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      tcreiPanes.forEach(pane => {
        if (pane.id === target) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // Initial setup
  showSlide(currentSlide);

  // Nav arrow fade on idle
  const navArrows = document.querySelectorAll('.nav-arrow');
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
    navFadeTimeout = setTimeout(() => {
      hideArrows();
    }, 2000);
  }

  // Fade arrows out after 2s of mouse inactivity
  document.addEventListener('mousemove', resetArrowFadeTimer);

  // Initial state: arrows visible
  showArrows();
});