# Performance Optimization and Mobile Menu Implementation

The user reported lag across the site and an unclickable mobile menu.

## Proposed Changes

### 1. Implement Mobile Navigation Menu
Currently, `Topbar.jsx` has a "MENU" button but no corresponding mobile menu logic. 
- Create a slide-down or overlay mobile menu in `Topbar.jsx`.
- Render the navigation items (HOME, SEARCH, ANALYSIS, PROFILE, SETTINGS) when the menu is toggled.
- Handle routing and close the menu on selection.

### 2. Performance Optimizations (Fixing Lag)
The heavy `backdrop-filter: blur(20px)` on `.glass-frost` classes (used extensively in `MovieCard` and layout components) causes massive GPU strain, especially with 100+ items rendered on the page, resulting in jittery animations and scrolling.
- **CSS Optimization**: Add hardware acceleration (`transform: translateZ(0)`, `backface-visibility: hidden`, `will-change: transform, backdrop-filter`) to `globals.css` for `.glass-frost` utilities.
- **MovieCard Optimization**: Optimize `MovieCard.jsx` to only trigger heavy blur effects efficiently or use a solid fallback on mobile devices if needed.
- **Overlay Optimization**: Ensure all full-screen animated overlays (`NoiseOverlay`, `ScanLine`) are properly hardware-accelerated to prevent repaint lag.

## User Review Required
Please confirm if the slide-down overlay style for the mobile menu is acceptable. The performance fixes will maintain the glass-frost aesthetic while leveraging GPU acceleration to ensure buttery smooth 60fps rendering.
