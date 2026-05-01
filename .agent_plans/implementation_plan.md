# Implementation Plan: Details Layout & Glitch Transition Revamp

This plan outlines the required changes to remove the horizontal line styling, append new metadata beneath the trailer, and overhaul the glitch transition to use central geometric shapes with 50% transparency.

## User Review Required

> [!IMPORTANT]  
> Please review the proposed changes below. If you have the second reference image available, let me know any specific colors or arrangements of the geometric shapes. Otherwise, I will implement a premium, aesthetic geometric glitch (circles, rectangles, squares) in the center of the screen.
> 
> Also, TMDB does not natively provide "Rotten Tomatoes" scores or "OTT Platforms" by default without extra API calls (like OMDb or TMDB watch providers). For now, I will use placeholder mock data for Rotten Tomatoes and OTT Platforms, or if you prefer, please confirm we should fetch them from a specific provider.

## Proposed Changes

---

### Page Layout Refinement

#### [MODIFY] `app/(main)/details/page.jsx`
- **Remove Horizontal Lines:** 
  - Delete the `<GlitchDivider />` component invocation at the bottom of the details section.
  - Remove the `border-b border-[rgba(0,0,0,0.1)]` classes from the `Hero Backdrop` and `Main Content` wrapper divs.
  - Remove the `lg:border-r border-[rgba(0,0,0,0.1)]` from the left column (Synopsis).
- **Add Metadata Space:** 
  - Below the Trailer iframe inside the right column, append a new metadata block.
  - The block will display four categories: `Genre`, `IMDB`, `Rotten Tomatoes`, and `Available On` (OTT).
  - Use high-fidelity brutalist/editorial styling matching the rest of the application (e.g., uppercase text, small fonts, wide tracking, borders for separation).

---

### Glitch Transition Overhaul

#### [MODIFY] `components/GlitchOverlay.jsx`
- **Transparency:** 
  - Change the overall overlay background and the final "black screen" flash to `bg-black/50` or an equivalent semi-transparent dark backdrop instead of full opacity black.
  - Make sure the parent container uses `backdrop-blur-sm` or similar to keep the transition smooth but partially transparent.
- **Geometric Shapes vs. Horizontal Lines:**
  - Remove the 10 horizontal `.transition-slice` elements.
  - Replace them with a cluster of geometric SVGs/divs (squares, thin rectangles, circles) positioned absolutely in the center region of the screen.
  - These shapes will act as the "glitch" artifacts: scaling, skewing, and blinking rapidly using GSAP, accompanied by the RGB splits.
  - Ensure the aesthetic looks premium, dynamic, and closely mimics a modern interface glitch rather than a broken TV scanline effect.

## Verification Plan

### Manual Verification
1. Open any movie details page (`/details?id=...`).
2. Verify that horizontal dividing lines are gone.
3. Verify that the new metadata section (Genre, IMDB, Rotten Tomatoes, OTT Platform) is visible immediately below the trailer.
4. Trigger a back navigation (`← BACK TO SECTOR`).
5. Verify the glitch transition uses center-aligned geometric shapes instead of horizontal slices, and that the underlying page remains 50% visible (transparent overlay).
