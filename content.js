// Chess.com Board Theme Switcher - Content Script

const THEMES = {
  india: {
    name: 'Royal Taj Saffron',
    light: '#fef6eb', // Cardamom Ivory
    dark: '#b95e34',  // Terracotta Saffron
    lightCoord: '#b95e34',
    darkCoord: '#fef6eb'
  },
  iran: {
    name: 'Esfahan Turquoise',
    light: '#eefbfa', // Teal Ice
    dark: '#0c766e',  // Esfahan Turquoise
    lightCoord: '#0c766e',
    darkCoord: '#eefbfa'
  },
  russia: {
    name: 'Moscow Crimson',
    light: '#f1f5f9', // Neva Snow
    dark: '#961b1b',  // Moscow Crimson
    lightCoord: '#961b1b',
    darkCoord: '#f1f5f9'
  }
};

// Generate 8x8 checkerboard SVG background URL-encoded with subtle watermarks
function generateSvgUrl(lightColor, darkColor, themeKey) {
  // Checkerboard coordinates for the 32 dark squares
  const darkSquares = [
    { x: 1, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 }, { x: 7, y: 0 },
    { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
    { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 }, { x: 7, y: 2 },
    { x: 0, y: 3 }, { x: 2, y: 3 }, { x: 4, y: 3 }, { x: 6, y: 3 },
    { x: 1, y: 4 }, { x: 3, y: 4 }, { x: 5, y: 4 }, { x: 7, y: 4 },
    { x: 0, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 },
    { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }, { x: 7, y: 6 },
    { x: 0, y: 7 }, { x: 2, y: 7 }, { x: 4, y: 7 }, { x: 6, y: 7 }
  ];

  let defs = '';
  let motifInstances = '';
  let flagDef = '';
  let flagInstances = '';

  if (themeKey === 'india') {
    // Clean, proper Taj Mahal silhouette centered towards the center squares of the board
    defs = `
      <g id="motif" stroke="#ffffff" stroke-width="0.025" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.16">
        <!-- Plinths -->
        <rect x="2.7" y="4.8" width="2.6" height="0.1" />
        <rect x="2.9" y="4.7" width="2.2" height="0.1" />

        <!-- Main Mausoleum Building Frame -->
        <path d="M 3.1,4.7 L 3.1,3.9 L 4.9,3.9 L 4.9,4.7 Z" />

        <!-- Central Arched Portal (Pishtaq) -->
        <path d="M 3.55,4.7 L 3.55,4.0 C 3.55,3.9 3.65,3.85 4.0,3.85 C 4.35,3.85 4.45,3.9 4.45,4.0 L 4.45,4.7" />
        <path d="M 3.7,4.7 L 3.7,4.3 C 3.7,4.2 3.8,4.15 4.0,4.15 C 4.2,4.15 4.3,4.2 4.3,4.3 L 4.3,4.7" />

        <!-- Left Side Portal Arches -->
        <path d="M 3.2,4.7 L 3.2,4.35 C 3.2,4.3 3.25,4.3 3.325,4.3 C 3.4,4.3 3.45,4.3 3.45,4.35 L 3.45,4.7" />
        <path d="M 3.2,4.3 L 3.2,3.95 C 3.2,3.9 3.25,3.9 3.325,3.9 C 3.4,3.9 3.45,3.9 3.45,3.95 L 3.45,4.3" />

        <!-- Right Side Portal Arches -->
        <path d="M 4.55,4.7 L 4.55,4.35 C 4.55,4.3 4.6,4.3 4.675,4.3 C 4.75,4.3 4.8,4.3 4.8,4.35 L 4.8,4.7" />
        <path d="M 4.55,4.3 L 4.55,3.95 C 4.55,3.9 4.6,3.9 4.675,3.9 C 4.75,3.9 4.8,3.9 4.8,3.95 L 4.8,4.3" />

        <!-- Main Center Dome -->
        <rect x="3.65" y="3.9" width="0.7" height="0.15" /> <!-- Drum -->
        <path d="M 3.6,3.75 C 3.45,3.5 3.5,3.1 4.0,2.7 C 4.5,3.1 4.55,3.5 4.4,3.75 Z" /> <!-- Onion Bulb -->
        <path d="M 3.9,2.7 C 3.95,2.67 4.05,2.67 4.1,2.7" /> <!-- Lotus Crest -->
        <path d="M 4.0,2.65 L 4.0,2.1" /> <!-- Finial Spire -->
        <circle cx="4.0" cy="2.3" r="0.03" /> <!-- Finial Crescent -->

        <!-- Left Chhatri (Cupola on Pillars) -->
        <path d="M 3.25,3.9 L 3.25,3.6 M 3.5,3.9 L 3.5,3.6" />
        <path d="M 3.2,3.6 C 3.15,3.45 3.2,3.3 3.375,3.2 C 3.55,3.3 3.6,3.45 3.55,3.6 Z" />
        <path d="M 3.375,3.2 L 3.375,3.0" />

        <!-- Right Chhatri (Cupola on Pillars) -->
        <path d="M 4.5,3.9 L 4.5,3.6 M 4.75,3.9 L 4.75,3.6" />
        <path d="M 4.45,3.6 C 4.4,3.45 4.45,3.3 4.625,3.2 C 4.8,3.3 4.85,3.45 4.8,3.6 Z" />
        <path d="M 4.625,3.2 L 4.625,3.0" />

        <!-- Left Corner Minaret -->
        <path d="M 2.75,4.8 L 2.8,3.1 L 2.9,3.1 L 2.95,4.8 Z" /> <!-- Shaft -->
        <path d="M 2.73,4.25 L 2.97,4.25" /> <!-- Balcony 1 -->
        <path d="M 2.76,3.7 L 2.94,3.7" /> <!-- Balcony 2 -->
        <path d="M 2.8,3.1 L 2.9,3.1" /> <!-- Balcony 3 -->
        <path d="M 2.82,3.1 L 2.82,2.9 M 2.88,3.1 L 2.88,2.9" /> <!-- Cupola Pillars -->
        <path d="M 2.8,2.9 C 2.77,2.8 2.8,2.65 2.85,2.6 C 2.9,2.65 2.93,2.8 2.9,2.9 Z" /> <!-- Cupola Dome -->
        <path d="M 2.85,2.6 L 2.85,2.4" />

        <!-- Right Corner Minaret -->
        <path d="M 5.05,4.8 L 5.1,3.1 L 5.2,3.1 L 5.25,4.8 Z" /> <!-- Shaft -->
        <path d="M 5.03,4.25 L 5.27,4.25" /> <!-- Balcony 1 -->
        <path d="M 5.06,3.7 L 5.24,3.7" /> <!-- Balcony 2 -->
        <path d="M 5.1,3.1 L 5.2,3.1" /> <!-- Balcony 3 -->
        <path d="M 5.12,3.1 L 5.12,2.9 M 5.18,3.1 L 5.18,2.9" /> <!-- Cupola Pillars -->
        <path d="M 5.1,2.9 C 5.07,2.8 5.1,2.65 5.15,2.6 C 5.2,2.65 5.23,2.8 5.2,2.9 Z" /> <!-- Cupola Dome -->
        <path d="M 5.15,2.6 L 5.15,2.4" />
      </g>
    `;
    flagDef = `
      <g id="flag" opacity="0.8">
        <rect x="0.15" y="0.26" width="0.7" height="0.16" fill="#FF9933" />
        <rect x="0.15" y="0.42" width="0.7" height="0.16" fill="#FFFFFF" />
        <rect x="0.15" y="0.58" width="0.7" height="0.16" fill="#138808" />
        <circle cx="0.5" cy="0.5" r="0.04" stroke="#000080" stroke-width="0.008" fill="none" />
      </g>
    `;
  } else if (themeKey === 'iran') {
    // Persian Lion & Sun emblem centering inside 1x1 squares
    defs = `
      <g id="motif" stroke-width="0.035" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.12">
        <!-- Sun and rays -->
        <circle cx="0.58" cy="0.4" r="0.1" />
        <path d="M 0.58,0.3 L 0.58,0.24" />
        <path d="M 0.51,0.33 L 0.46,0.28" />
        <path d="M 0.65,0.33 L 0.7,0.28" />
        <path d="M 0.48,0.4 L 0.42,0.4" />
        <path d="M 0.68,0.4 L 0.74,0.4" />
        <!-- Lion silhouette (standing profile looking left) -->
        <path d="M 0.3,0.75 L 0.34,0.55 C 0.34,0.55 0.3,0.51 0.3,0.45 C 0.3,0.39 0.36,0.33 0.42,0.35 C 0.48,0.37 0.5,0.43 0.5,0.47 C 0.5,0.51 0.46,0.55 0.48,0.59 C 0.5,0.63 0.58,0.61 0.64,0.62 C 0.68,0.63 0.72,0.67 0.72,0.75" />
        <path d="M 0.64,0.62 C 0.7,0.59 0.74,0.51 0.72,0.45" /> <!-- Tail -->
      </g>
    `;
    flagDef = `
      <g id="flag" opacity="0.8">
        <rect x="0.15" y="0.26" width="0.7" height="0.16" fill="#239E46" />
        <rect x="0.15" y="0.42" width="0.7" height="0.16" fill="#FFFFFF" />
        <rect x="0.15" y="0.58" width="0.7" height="0.16" fill="#DA251D" />
        <circle cx="0.5" cy="0.5" r="0.03" fill="#DA251D" />
      </g>
    `;
  } else if (themeKey === 'russia') {
    // Saint Basil's Cathedral silhouette centering inside 1x1 squares
    defs = `
      <g id="motif" stroke-width="0.035" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.12">
        <!-- Center Dome -->
        <path d="M 0.44,0.75 L 0.44,0.48 C 0.44,0.48 0.4,0.42 0.4,0.32 C 0.4,0.22 0.47,0.2 0.5,0.14 C 0.53,0.2 0.6,0.22 0.6,0.32 C 0.6,0.42 0.56,0.48 0.56,0.48 L 0.56,0.75" />
        <path d="M 0.5,0.06 L 0.5,0.14 M 0.47,0.09 L 0.53,0.09" stroke-width="0.025" /> <!-- Cross -->
        <!-- Left Dome -->
        <path d="M 0.26,0.75 L 0.26,0.56 C 0.26,0.56 0.23,0.52 0.23,0.45 C 0.23,0.38 0.28,0.36 0.3,0.32 C 0.32,0.36 0.37,0.38 0.37,0.45 C 0.37,0.52 0.34,0.56 0.34,0.56 L 0.34,0.75" />
        <!-- Right Dome -->
        <path d="M 0.66,0.75 L 0.66,0.56 C 0.66,0.56 0.63,0.52 0.63,0.45 C 0.63,0.38 0.68,0.36 0.7,0.32 C 0.72,0.36 0.77,0.38 0.77,0.45 C 0.77,0.52 0.74,0.56 0.74,0.56 L 0.74,0.75" />
        <!-- Base platform -->
        <path d="M 0.2,0.75 L 0.8,0.75" />
      </g>
    `;
    flagDef = `
      <g id="flag" opacity="0.8">
        <rect x="0.15" y="0.26" width="0.7" height="0.16" fill="#FFFFFF" />
        <rect x="0.15" y="0.42" width="0.7" height="0.16" fill="#0033A0" />
        <rect x="0.15" y="0.58" width="0.7" height="0.16" fill="#DA251D" />
      </g>
    `;
  }

  if (defs) {
    const centerSquares = [
      { x: 3, y: 3, isLight: true },
      { x: 4, y: 3, isLight: false },
      { x: 3, y: 4, isLight: false },
      { x: 4, y: 4, isLight: true }
    ];
    centerSquares.forEach(sq => {
      const strokeColor = sq.isLight ? darkColor : lightColor;
      motifInstances += `<use href="#motif" x="${sq.x}" y="${sq.y}" stroke="${strokeColor}"/>`;
    });
  }

  if (flagDef) {
    const corners = [
      { x: 0, y: 0 },
      { x: 7, y: 0 },
      { x: 0, y: 7 },
      { x: 7, y: 7 }
    ];
    corners.forEach(sq => {
      flagInstances += `<use href="#flag" x="${sq.x}" y="${sq.y}"/>`;
    });
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="100%" height="100%">
      <defs>
        ${defs}
        ${flagDef}
      </defs>
      <rect width="8" height="8" fill="${lightColor}"/>
      <path d="${darkSquares.map(sq => `M${sq.x},${sq.y}h1v1h-1z`).join(' ')}" fill="${darkColor}"/>
      ${motifInstances}
      ${flagInstances}
    </svg>
  `;
  return `url("data:image/svg+xml,${encodeURIComponent(svg.trim())}")`;
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
  const boardImage = generateSvgUrl(theme.light, theme.dark, currentThemeKey);
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
  const boardImage = generateSvgUrl(theme.light, theme.dark, themeKey);

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
