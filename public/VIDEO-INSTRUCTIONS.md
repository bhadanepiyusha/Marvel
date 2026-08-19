# How to Add Your Video File

## Steps to Add the Marvel Comics Intro Video:

1. **Rename your video file** from `Marvel Comics Intro.mp4` to `marvel-comics-intro.mp4` (remove spaces and use lowercase)

2. **Place the video file** in this `/public` directory

3. **Final path should be:** `/public/marvel-comics-intro.mp4`

## Current Setup:

The LandingPage.tsx is already configured to use the video with:
- Autoplay ✅
- Loop ✅
- Muted ✅
- PlaysInline (for mobile) ✅
- Dark overlay for text readability ✅
- Fallback poster image while loading ✅

## Video Specifications:

- Path in code: `/marvel-comics-intro.mp4`
- Format: MP4
- Optimization: Recommended to compress for web (H.264 codec, ~5-10MB for best performance)

## If Video Doesn't Show:

1. Make sure the file name matches exactly: `marvel-comics-intro.mp4`
2. Clear browser cache and refresh
3. Check browser console for any loading errors
4. Ensure video file is not corrupted

## Alternative Formats:

If MP4 doesn't work, you can also add WebM format:
```html
<source src="/marvel-comics-intro.webm" type="video/webm" />
<source src="/marvel-comics-intro.mp4" type="video/mp4" />
```

The browser will automatically choose the best format it supports.
