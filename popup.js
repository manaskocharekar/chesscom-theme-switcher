// Chess.com Board Color Customizer - Popup Controller

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.theme-card');

  // Load currently active theme and select corresponding card
  chrome.storage.local.get({ boardTheme: 'emerald' }, (result) => {
    const activeTheme = result.boardTheme;
    const activeCard = document.querySelector(`.theme-card[data-theme="${activeTheme}"]`);
    if (activeCard) {
      activeCard.classList.add('selected');
    }
  });

  // Handle click events on theme cards
  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove selection from all cards
      cards.forEach(c => c.classList.remove('selected'));

      // Add selection to clicked card
      card.classList.add('selected');

      // Update selection in chrome storage
      const selectedTheme = card.getAttribute('data-theme');
      chrome.storage.local.set({ boardTheme: selectedTheme });
    });
  });
});
