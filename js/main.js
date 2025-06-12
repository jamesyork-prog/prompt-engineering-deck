// main.js

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const progressBar = document.getElementById('progress-bar');
  const navLeft = document.getElementById('nav-left');
  const navRight = document.getElementById('nav-right');
  const navArrows = document.querySelectorAll('.nav-arrow'); // Cache nav arrows

  // SVG Icon strings for better maintainability
  const SVG_ARROW_LEFT_DARK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  const SVG_ARROW_RIGHT_DARK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
  const SVG_ARROW_LEFT_LIGHT = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  const SVG_ARROW_RIGHT_LIGHT = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';

// Add this function inside the 'DOMContentLoaded' event listener in main.js

function setupLogoCarousel() {
  const track = document.querySelector('.logo-track');
  // Check if the track exists
  if (track) {
    // Find the original set of logos
    const originalSet = track.querySelector('.logo-set');
    // If the set exists, clone it and append it to the track
    if (originalSet) {
      const clone = originalSet.cloneNode(true);
      track.appendChild(clone);
    }
  }
}

// Call the function to set up the carousel
setupLogoCarousel();

  // Progress Bar
  function updateProgressBar() {
    const percent = ((currentSlide) / (slides.length - 1)) * 100;
    if (progressBar) progressBar.style.width = percent + '%';
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
    });

    const targetSlide = slides[index];
    if (targetSlide) {
      targetSlide.classList.add('active');
      updateNavTheme(targetSlide);
    }
    updateProgressBar();
  }

  function updateNavTheme(activeSlide) {
    const theme = activeSlide.getAttribute('data-theme');
    navArrows.forEach(nav => { // Use cached navArrows
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

  // Keyboard & Button Navigation
  if (navRight) {
    navRight.addEventListener('click', () => { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); });
  }
  if (navLeft) {
    navLeft.addEventListener('click', () => { currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); } 
    else if (e.key === 'ArrowLeft') { currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); }
  });
  
  // Initial setup
  showSlide(currentSlide);

  // Nav arrow fade on idle
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