# Walkthrough - Hero Text Hover Fix

I have disabled the hover movement effect on the home page tagline text to ensure it remains static as requested.

## Changes Made

### Home Page
- **File**: [page.jsx](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/app/%28main%29/home/page.jsx)
- Removed the `useParallax` transform from the hero `h1` element.
- Cleaned up the unused `useParallax` import and its associated variables (`x`, `y`).

## Verification Results
- The tagline text "A FASTER, MOOD-SHAPED CINEMA SURFACE FOR MOVIES AND SERIES." is now static.
- No console errors regarding unused variables or imports.
