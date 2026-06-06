// Chess.com Board Color Customizer - Content Script

const THEMES = {
  emerald: {
    name: 'Emerald Velvet',
    light: '#eaf0eb', // Mint Ice
    dark: '#3f6b55',  // Emerald Forest
    lightCoord: '#3f6b55', // Dark green on light square
    darkCoord: '#eaf0eb'   // Mint on dark square
  },
  ocean: {
    name: 'Midnight Ocean',
    light: '#ebf2fa', // Ice Blue
    dark: '#466a8a',  // Deep Ocean
    lightCoord: '#466a8a', // Deep ocean blue on light square
    darkCoord: '#ebf2fa'   // Ice blue on dark square
  },
  amethyst: {
    name: 'Amethyst Dusk',
    light: '#f1ecf6', // Lavender Mist
    dark: '#6c568c',  // Royal Amethyst
    lightCoord: '#6c568c', // Royal amethyst on light square
    darkCoord: '#f1ecf6'   // Lavender on dark square
  }
};

// Generate 8x8 checkerboard SVG background URL-encoded
function generateSvgUrl(lightColor, darkColor) {
  // Checkerboard path for the 32 dark squares on an 8x8 grid
  const pathD = [
    "M1,0h1v1h-1z M3,0h1v1h-1z M5,0h1v1h-1z M7,0h1v1h-1z",
    "M0,1h1v1h-1z M2,1h1v1h-1z M4,1h1v1h-1z M6,1h1v1h-1z",
    "M1,2h1v1h-1z M3,2h1v1h-1z M5,2h1v1h-1z M7,2h1v1h-1z",
    "M0,3h1v1h-1z M2,3h1v1h-1z M4,3h1v1h-1z M6,3h1v1h-1z",
    "M1,4h1v1h-1z M3,4h1v1h-1z M5,4h1v1h-1z M7,4h1v1h-1z",
    "M0,5h1v1h-1z M2,5h1v1h-1z M4,5h1v1h-1z M6,5h1v1h-1z",
    "M1,6h1v1h-1z M3,6h1v1h-1z M5,6h1v1h-1z M7,6h1v1h-1z",
    "M0,7h1v1h-1z M2,7h1v1h-1z M4,7h1v1h-1z M6,7h1v1h-1z"
  ].join(" ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="100%" height="100%"><rect width="8" height="8" fill="${lightColor}"/><path d="${pathD}" fill="${darkColor}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// Keep track of active theme
let currentThemeKey = 'emerald';

function injectShadowStyles(boardEl, cssText) {
  if (boardEl && boardEl.shadowRoot) {
    let styleEl = boardEl.shadowRoot.getElementById('chesscom-board-customizer-shadow-theme');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'chesscom-board-customizer-shadow-theme';
      boardEl.shadowRoot.appendChild(styleEl);
    }
    styleEl.innerHTML = cssText;
  }
}

function applyShadowTheme(boardEl) {
  const theme = THEMES[currentThemeKey] || THEMES.emerald;
  const boardImage = generateSvgUrl(theme.light, theme.dark);
  const cssText = `
    :host,
    .board,
    .chessboard,
    .chessboard-component,
    div[class*="board"] {
      background-image: ${boardImage} !important;
    }
  `;
  injectShadowStyles(boardEl, cssText);
}

// Inject or update the styles
function applyTheme(themeKey) {
  currentThemeKey = themeKey;
  const theme = THEMES[themeKey] || THEMES.emerald;
  const boardImage = generateSvgUrl(theme.light, theme.dark);

  let styleEl = document.getElementById('chesscom-board-customizer-theme');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'chesscom-board-customizer-theme';
    // Append to documentElement so it applies immediately, even before head is parsed
    document.documentElement.appendChild(styleEl);
  }

  styleEl.innerHTML = `
    :root {
      --custom-board-image: ${boardImage};
      --custom-light-coord-color: ${theme.lightCoord};
      --custom-dark-coord-color: ${theme.darkCoord};
    }

    /* Target board elements with class/attribute overrides (no layout wrappers like #board-layout-main) */
    wc-chess-board.board[class],
    wc-chess-board[class],
    chess-board[class],
    .board[class],
    .chessboard[class],
    .chessboard-component[class] {
      background-image: var(--custom-board-image) !important;
    }

    /* Style the rank and file coordinates text & divs */
    .coordinate-light,
    text[class*="coordinate-light"],
    div[class*="coordinate-light"] {
      fill: var(--custom-light-coord-color) !important;
      color: var(--custom-light-coord-color) !important;
    }

    .coordinate-dark,
    text[class*="coordinate-dark"],
    div[class*="coordinate-dark"] {
      fill: var(--custom-dark-coord-color) !important;
      color: var(--custom-dark-coord-color) !important;
    }
  `;

  // Also try applying to existing board elements (for open shadow roots)
  const boards = document.querySelectorAll('wc-chess-board, chess-board');
  boards.forEach(applyShadowTheme);
}

// Set up mutation observer to apply theme to dynamically added boards (including open shadow roots)
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'WC-CHESS-BOARD' || node.tagName === 'CHESS-BOARD') {
          applyShadowTheme(node);
        } else {
          const boards = node.querySelectorAll('wc-chess-board, chess-board');
          boards.forEach(applyShadowTheme);
        }
      }
    }
  }
});
observer.observe(document.documentElement, { childList: true, subtree: true });

// Initial load from chrome storage
chrome.storage.local.get({ boardTheme: 'emerald' }, (result) => {
  applyTheme(result.boardTheme);
});

// Listen for updates from the popup
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.boardTheme) {
    applyTheme(changes.boardTheme.newValue);
  }
});
