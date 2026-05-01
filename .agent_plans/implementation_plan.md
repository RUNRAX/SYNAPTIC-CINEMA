# Global Glass Frost Update

The goal is to update the visual properties of the floating UI elements (sidebar, top bar, bottom bar, settings cards, etc.) to have higher transparency, a lower blur radius (approx 5%), and a high glow/saturation effect for content scrolling underneath them.

## User Review Required

> [!IMPORTANT]
> Please confirm my interpretation of your request:
> You want the `glass-frost` style (which is applied to the Sidebar, Topbar, Bottom Ticker, and UI cards) to be updated globally to have:
> 1. **Increased transparency** (lower opacity background).
> 2. **Less blur** (a small blur, around 5px).
> 3. **High glow and saturation** for any content (like movie cards or text) that passes underneath these floating elements.
>
> Is this correct, or did you mean to *exclude* the sidebar, top bar, and bottom bar from these changes? (I interpreted "leaving" as a typo for "regarding" or referring to the elements themselves).

## Proposed Changes

### 1. `app/globals.css`
Update the `.glass-frost` utility classes to achieve the desired effect.

#### [MODIFY] globals.css
- Decrease the alpha channel of the background colors (e.g., from `0.55` to `0.15` or `0.20`).
- Update `backdrop-filter: blur(16px) saturate(180%)` to `backdrop-filter: blur(5px) saturate(250%) brightness(120%)` to create the 5px blur and the high glow/saturation effect.
- Apply these changes to `.glass-frost`, `.glass-frost-dark`, and `.glass-frost-light`.

## Verification Plan

### Manual Verification
- Scroll the page to observe movie cards and background elements passing under the top bar, sidebar, and bottom ticker.
- Verify that the elements underneath appear highly saturated and glowing.
- Confirm the blur level is subtle (around 5px) and transparency is increased.
