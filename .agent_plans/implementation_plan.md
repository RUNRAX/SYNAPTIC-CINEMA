# Add 'Fear' and 'Disgust' Emotions

This plan outlines the steps to fully integrate the missing emotions (`fear` and `disgust`) into the platform. While the backend model and `faceApi.js` can detect them, they are currently missing from various UI components and recommendation maps.

## User Review Required
> [!NOTE]
> Please review the default genre mapping below for these emotions. Are you satisfied with these genre fallback choices?
> - **Fear**: `['HORROR', 'THRILLER']`
> - **Disgust**: `['THRILLER', 'HORROR']` (Can also map to Crime/Mystery if you prefer)

## Proposed Changes

---

### UI Components

#### [MODIFY] `components/MoodBars.jsx`
- Add `Fear` and `Disgust` to the `moodData` array so they visually render on the Analysis page when detected.

#### [MODIFY] `app/(main)/settings/page.jsx`
- Add `disgust` to the `EMOTIONS` array so users can configure it in their Mood & Genre Mapping settings. (Fear is already there).
- Add a default genre fallback for `disgust` (e.g. `['THRILLER', 'HORROR']`).

#### [MODIFY] `app/(main)/analysis/page.jsx`
- Ensure `disgust` is present in `DEFAULT_MOOD_GENRES`.
- Update the `setResults` logic inside `startAnalysis` to correctly pull `fear` (mapped from `fearful` in faceApi) and `disgust` (mapped from `disgusted` in faceApi) from the detection expressions so they are passed to the `MoodBars` component.

---

### Backend / Recommendation Logic

#### [MODIFY] `lib/server/tmdb.js`
- Update `EMOTION_GENRE_MAP` to include `disgust: { movie: [27, 53], tv: [9648, 10765] }`. (Fear is already correctly mapped here).

#### [MODIFY] `BACKEND/app.py`
- Update the `genre_map` inside the `/recommendations` route to include the exact same mapping for `disgust` to keep the Python backend perfectly synchronized with the Next.js API.

## Verification Plan

### Manual Verification
- Go to Settings and verify that "When I am disgust..." appears and can be configured.
- Go to Analysis, run a facial scan (make a disgusted or fearful face) and verify that the metrics chart displays bars for Fear and Disgust.
- Ensure recommendations load correctly when these emotions are triggered.
