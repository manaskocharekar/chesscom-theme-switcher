// Chess.com Board Theme Switcher - Content Script

const THEMES = {
  india: {
    name: 'Royal Taj Saffron',
    light: '#fef6eb', // Cardamom Ivory
    dark: '#b95e34',  // Terracotta Saffron
    lightCoord: '#b95e34',
    darkCoord: '#fef6eb',
    wStroke: '#d4af37', // Gold outline for white pieces
    bStroke: '#ffd700'  // Bright gold outline for black pieces
  },
  iran: {
    name: 'Esfahan Turquoise',
    light: '#eefbfa', // Teal Ice
    dark: '#0c766e',  // Esfahan Turquoise
    lightCoord: '#0c766e',
    darkCoord: '#eefbfa',
    wStroke: '#e2e8f0', // Silver/light outline
    bStroke: '#94a3b8'  // Steel outline
  },
  russia: {
    name: 'Moscow Crimson',
    light: '#f1f5f9', // Neva Snow
    dark: '#961b1b',  // Moscow Crimson
    lightCoord: '#961b1b',
    darkCoord: '#f1f5f9',
    wStroke: '#dc2626', // Crimson red outline
    bStroke: '#ef4444'  // Bright red outline
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

// Generate country-themed custom vector chess pieces
function generatePieceSvg(themeKey, pieceType, isWhite) {
  const theme = THEMES[themeKey] || THEMES.india;
  
  // Custom gradient settings for each theme
  const gradientId = `grad-${themeKey}-${pieceType}-${isWhite ? 'w' : 'b'}`;
  let gradStart, gradEnd, strokeColor;
  const strokeWidth = 2.2;
  
  if (themeKey === 'india') {
    gradStart = isWhite ? '#fffdf5' : '#4a250f';
    gradEnd = isWhite ? '#eedcb3' : '#1e0c03';
    // Deep dark brown stroke for white pieces, light ivory stroke for black pieces
    strokeColor = isWhite ? '#361805' : '#eedcb3';
  } else if (themeKey === 'iran') {
    gradStart = isWhite ? '#e8faf7' : '#1b263b';
    gradEnd = isWhite ? '#7ce3d8' : '#0d131f';
    // Deep navy stroke for white pieces, mint/light stroke for black pieces
    strokeColor = isWhite ? '#080d1a' : '#e8faf7';
  } else { // russia
    gradStart = isWhite ? '#ffffff' : '#334155';
    gradEnd = isWhite ? '#cbd5e1' : '#0f172a';
    // Deep slate/dark stroke for white pieces, snow white stroke for black pieces
    strokeColor = isWhite ? '#1e293b' : '#f1f5f9';
  }

  // Base Pedestal
  const baseHtml = `
    <path d="M 30,82 L 70,82 C 70,78 68,76 64,76 L 36,76 C 32,76 30,78 30,82 Z" />
    <rect x="22" y="82" width="56" height="5" rx="2" />
  `;

  // Draw piece geometries depending on theme
  let bodyContent = '';
  
  if (themeKey === 'india') {
    // INDIA Theme Pieces (Lotus curves, dome style)
    if (pieceType === 'p') {
      bodyContent = `
        ${baseHtml}
        <path d="M 38,76 C 40,64 43,54 47,44 L 53,44 C 57,54 60,64 62,76 Z" />
        <circle cx="50" cy="32" r="13" />
      `;
    } else if (pieceType === 'r') {
      bodyContent = `
        ${baseHtml}
        <path d="M 34,76 L 37,46 L 63,46 L 66,76 Z" />
        <path d="M 32,46 C 32,32 40,26 50,26 C 60,26 68,32 68,46 Z" />
        <path d="M 50,26 L 50,18" />
      `;
    } else if (pieceType === 'n') {
      bodyContent = `
        ${baseHtml}
        <path d="M 33,76 C 33,76 36,72 36,66 C 36,56 31,52 29,45 C 27,37 33,26 43,20 C 51,16 59,20 61,26 C 63,32 59,38 57,42 C 55,46 57,50 57,50 C 57,50 53,48 49,50 C 45,52 45,56 45,56 L 47,62 L 41,66 L 43,76 Z" />
      `;
    } else if (pieceType === 'b') {
      bodyContent = `
        ${baseHtml}
        <path d="M 36,76 C 38,66 40,54 43,44 C 43,44 38,40 42,26 C 46,14 54,14 58,26 C 62,40 57,44 57,44 C 60,58 62,66 64,76 Z" />
        <circle cx="50" cy="14" r="3.5" />
        <path d="M 46,36 L 54,40" stroke-linecap="round" />
      `;
    } else if (pieceType === 'q') {
      bodyContent = `
        ${baseHtml}
        <path d="M 36,76 C 38,66 42,56 44,46 L 32,36 L 42,44 L 50,22 L 58,44 L 68,36 L 56,46 C 58,56 62,66 64,76 Z" />
        <circle cx="32" cy="36" r="3" />
        <circle cx="50" cy="22" r="3" />
        <circle cx="68" cy="36" r="3" />
      `;
    } else { // King
      bodyContent = `
        ${baseHtml}
        <path d="M 36,76 C 38,66 42,56 44,48 C 42,48 36,44 40,28 C 44,18 56,18 60,28 C 64,44 58,48 56,48 C 58,66 62,76 64,76 Z" />
        <path d="M 50,12 L 50,20 M 45,15 C 47,17 53,17 55,15" />
      `;
    }
  } else if (themeKey === 'iran') {
    // IRAN Theme Pieces (Geometric minarets, diamond cuts)
    if (pieceType === 'p') {
      bodyContent = `
        <polygon points="50,20 63,44 50,76 37,44" />
        <polygon points="50,76 64,82 36,82" />
      `;
    } else if (pieceType === 'r') {
      bodyContent = `
        ${baseHtml}
        <path d="M 36,76 L 39,46 L 61,46 L 64,76 Z" />
        <polygon points="33,46 33,34 42,34 42,40 58,40 58,34 67,34 67,46" />
      `;
    } else if (pieceType === 'n') {
      bodyContent = `
        <polygon points="32,82 40,82 42,66 32,54 30,42 42,24 58,24 62,34 54,42 50,42 46,46 44,56 38,62 40,82" />
      `;
    } else if (pieceType === 'b') {
      bodyContent = `
        <polygon points="50,18 62,38 56,66 62,82 38,82 44,66 38,38" />
        <line x1="45" y1="36" x2="55" y2="44" />
      `;
    } else if (pieceType === 'q') {
      bodyContent = `
        ${baseHtml}
        <path d="M 36,76 L 42,46 L 30,40 L 44,40 L 50,22 L 56,40 L 70,40 L 58,46 L 64,76 Z" />
        <circle cx="30" cy="40" r="3.5" />
        <circle cx="50" cy="22" r="3.5" />
        <circle cx="70" cy="40" r="3.5" />
      `;
    } else { // King
      bodyContent = `
        ${baseHtml}
        <path d="M 36,76 L 42,46 L 34,42 L 44,42 L 50,24 L 56,42 L 66,42 L 58,46 L 64,76 Z" />
        <path d="M 45,14 C 47,12 53,12 55,14" />
      `;
    }
  } else {
    // RUSSIA Theme Pieces (Onion dome style, imperial crown)
    if (pieceType === 'p') {
      bodyContent = `
        ${baseHtml}
        <path d="M 35,76 L 65,76 L 61,62 C 56,52 62,46 50,32 C 38,46 44,52 39,62 Z" />
        <circle cx="50" cy="26" r="5" />
      `;
    } else if (pieceType === 'r') {
      bodyContent = `
        ${baseHtml}
        <path d="M 35,76 L 38,50 L 62,50 L 65,76 Z" />
        <path d="M 34,50 C 34,38 38,30 50,22 C 62,30 66,38 66,50 Z" />
        <path d="M 50,22 L 50,15" />
      `;
    } else if (pieceType === 'n') {
      bodyContent = `
        ${baseHtml}
        <path d="M 32,76 L 42,76 L 44,66 C 44,66 38,60 38,52 C 38,42 42,30 52,22 C 58,18 62,22 60,30 C 58,34 52,38 50,44 C 48,48 48,52 44,56 L 46,62 L 38,66 Z" />
      `;
    } else if (pieceType === 'b') {
      bodyContent = `
        ${baseHtml}
        <path d="M 36,76 C 38,66 41,58 44,48 C 41,44 38,36 50,20 C 62,36 59,44 56,48 C 59,58 62,72 64,76 Z" />
        <path d="M 50,12 L 50,22 M 46,14 L 54,14 M 47,17 L 53,19" />
      `;
    } else if (pieceType === 'q') {
      bodyContent = `
        ${baseHtml}
        <path d="M 36,76 C 38,66 41,56 44,48 C 42,48 35,46 38,30 C 41,32 45,38 50,26 C 55,38 59,32 62,30 C 65,44 58,48 56,48 C 59,60 62,70 64,76 Z" />
      `;
    } else { // King
      bodyContent = `
        ${baseHtml}
        <path d="M 36,76 C 38,66 41,56 44,48 C 42,48 34,46 38,30 C 42,32 46,40 50,26 C 54,40 58,32 62,30 C 66,46 58,48 56,48 C 58,60 62,70 64,76 Z" />
        <path d="M 50,14 L 50,24 M 46,17 L 54,17" />
      `;
    }
  }

  // Country-themed motifs overlays
  let motif = '';
  if (themeKey === 'india') {
    motif = `<circle cx="50" cy="62" r="3.5" fill="#d4af37" stroke="none" />`;
  } else if (themeKey === 'iran') {
    motif = `<polygon points="50,56 54,60 50,64 46,60" fill="#ffffff" fill-opacity="0.4" stroke="#e2e8f0" stroke-width="0.8" />`;
  } else { // russia
    motif = `<polygon points="50,56 51.5,60 55,60 52,62 53.5,65 50,63 46.5,65 48,62 45,60 48.5,60" fill="#ffd700" stroke="none" />`;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${gradStart}" />
          <stop offset="100%" stop-color="${gradEnd}" />
        </linearGradient>
      </defs>
      <g fill="url(#${gradientId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linejoin="round" stroke-linecap="round">
        ${bodyContent}
        ${motif}
      </g>
    </svg>
  `;

  return `url("data:image/svg+xml,${encodeURIComponent(svg.trim())}")`;
}

// Generate CSS declarations for overriding all chess pieces
function generatePieceCssRules(themeKey) {
  // If the themeKey is invalid/old, fallback to india to prevent style breaks
  const validKey = THEMES[themeKey] ? themeKey : 'india';
  const pieces = ['p', 'r', 'n', 'b', 'q', 'k'];
  let css = '';
  
  pieces.forEach(p => {
    const whiteImg = generatePieceSvg(validKey, p, true);
    const blackImg = generatePieceSvg(validKey, p, false);
    
    css += `
      /* White piece overrides */
      wc-chess-board .w${p},
      chess-board .w${p},
      .board .w${p},
      .piece.w${p},
      .w${p} {
        background-image: ${whiteImg} !important;
      }
      /* Black piece overrides */
      wc-chess-board .b${p},
      chess-board .b${p},
      .board .b${p},
      .piece.b${p},
      .b${p} {
        background-image: ${blackImg} !important;
      }
    `;
  });
  
  return css;
}

// Keep track of active theme
let currentThemeKey = 'india';

function injectShadowStyles(boardEl, cssText) {
  if (boardEl && boardEl.shadowRoot) {
    let styleEl = boardEl.shadowRoot.querySelector('#chesscom-board-customizer-shadow-theme');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'chesscom-board-customizer-shadow-theme';
      boardEl.shadowRoot.appendChild(styleEl);
    }
    styleEl.innerHTML = cssText;
  }
}

function applyShadowTheme(boardEl) {
  if (currentThemeKey === 'original') {
    if (boardEl && boardEl.shadowRoot) {
      const styleEl = boardEl.shadowRoot.querySelector('#chesscom-board-customizer-shadow-theme');
      if (styleEl) {
        styleEl.remove();
      }
    }
    return;
  }
  const theme = THEMES[currentThemeKey] || THEMES.india;
  const boardImage = generateSvgUrl(theme.light, theme.dark);
  const pieceCss = generatePieceCssRules(currentThemeKey);
  const cssText = `
    :host,
    .board,
    .chessboard,
    .chessboard-component,
    div[class*="board"],
    .board[class],
    .chessboard[class],
    .chessboard-component[class] {
      background-image: ${boardImage} !important;
    }
    ${pieceCss}
  `;
  injectShadowStyles(boardEl, cssText);
}

// Inject or update global styles in page DOM
function applyTheme(themeKey) {
  // Safe fallback to 'india' if themeKey is invalid or obsolete (except 'original')
  if (themeKey !== 'original' && !THEMES[themeKey]) {
    themeKey = 'india';
  }
  currentThemeKey = themeKey;

  if (themeKey === 'original') {
    const styleEl = document.getElementById('chesscom-board-customizer-theme');
    if (styleEl) {
      styleEl.remove();
    }
    const boards = document.querySelectorAll('wc-chess-board, chess-board');
    boards.forEach(applyShadowTheme);
    return;
  }

  const theme = THEMES[themeKey];
  const boardImage = generateSvgUrl(theme.light, theme.dark);
  const pieceCss = generatePieceCssRules(themeKey);

  let styleEl = document.getElementById('chesscom-board-customizer-theme');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'chesscom-board-customizer-theme';
    document.documentElement.appendChild(styleEl);
  }

  styleEl.innerHTML = `
    :root {
      --custom-board-image: ${boardImage};
      --custom-light-coord-color: ${theme.lightCoord};
      --custom-dark-coord-color: ${theme.darkCoord};
    }

    /* Target board elements with both standard and high-specificity override lists */
    wc-chess-board,
    chess-board,
    .board,
    .chessboard,
    .chessboard-component,
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

    /* Custom chess piece styles (global) */
    ${pieceCss}
  `;

  // Also apply styles inside open shadow roots
  const boards = document.querySelectorAll('wc-chess-board, chess-board');
  boards.forEach(applyShadowTheme);
}

// Set up mutation observer to apply theme to dynamically added boards (including open shadow roots)
// We also monitor attribute mutations to handle class/style changes on board elements.
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
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
    } else if (mutation.type === 'attributes') {
      const node = mutation.target;
      if (node.tagName === 'WC-CHESS-BOARD' || node.tagName === 'CHESS-BOARD') {
        applyShadowTheme(node);
      }
    }
  }
});
observer.observe(document.documentElement, { 
  childList: true, 
  subtree: true,
  attributes: true,
  attributeFilter: ['class', 'style']
});

// Initial load from chrome storage (defaults to India theme)
chrome.storage.local.get({ boardTheme: 'india' }, (result) => {
  applyTheme(result.boardTheme);
});

// Listen for updates from the popup via chrome storage
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.boardTheme) {
    applyTheme(changes.boardTheme.newValue);
  }
});

// Listen for direct instant messages from the popup (messaging channel)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setTheme') {
    applyTheme(request.theme);
    sendResponse({ success: true });
  }
  return true;
});
