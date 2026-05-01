# Synaptic Cinema UI Updates & Glitch Transition Refactor

## Goal Description
The objective is to fix UI inconsistencies on the Details page (invisible IMDb score and empty gaps) and to completely overhaul the Glitch Overlay transition. The new transition will feature the word "SYNAPTIC" glitching in the center with diagonal scratches, heavy background blur, and a timing adjustment to ensure the next page is already loaded when the transition resolves.

## User Review Required
Please review the proposed design of the new glitch transition. It uses "SYNAPTIC" text and diagonal slashes instead of the previous geometric shapes and horizontal lines. Let me know if you approve of these changes.

## Proposed Changes

### `app/(main)/details/page.jsx`
- **Fix IMDb Visibility**: The IMDb score is currently invisible because it has both `bg-black` and `text-black`. We will change it to `text-accent` or `text-cream` to make it legible against the dark background.
- **Fill the Gap**: To make the metadata section look complete, we will extract additional information from the `details` object (such as `duration` and `release_date`) and add new rows below "ROTTEN TOMATOES" and "AVAILABLE ON".

### `components/GlitchOverlay.jsx`
- **Remove Old Elements**: Delete the `.geo-shape` geometric shapes and the `.scanline-burst` horizontal lines to comply with the new aesthetic requirements.
- **"SYNAPTIC" Text Glitch**: 
  - Add a centered container with three text layers: a main white "SYNAPTIC" layer, a cyan layer, and a red layer.
  - Animate the cyan and red layers using GSAP to shift their X and Y positions randomly, creating a chromatic aberration/glitch effect.
- **Scratches/Slashes**:
  - Add several thin, angled `div` elements positioned randomly across the screen.
  - Animate their opacity and scale during the GSAP timeline to create a slashing effect.
- **Background & Timing**:
  - Update the overlay background to `bg-black/80 backdrop-blur-xl` for a heavy blur effect.
  - Modify the GSAP timeline:
    - **Phase 1**: Quickly fade in the overlay, blur, and text.
    - **Phase 2**: Trigger the `callback` (page navigation).
    - **Phase 3**: Perform the rapid text glitches and slash flashes while the page behind is navigating. Hold the overlay opaque for ~600ms so the new page renders.
    - **Phase 4**: Fade out the overlay cleanly, revealing the fully loaded new page.

## Verification Plan
### Manual Verification
- Navigate to the Details page and verify the IMDb score is clearly visible.
- Check that the metadata section has been expanded to fill the gap.
- Click a link to trigger the transition. Ensure the screen blurs heavily, "SYNAPTIC" glitches in the center, diagonal scratches appear, no horizontal lines are present, and the new page is visible immediately after the overlay fades.
