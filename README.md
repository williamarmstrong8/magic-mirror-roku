# Roku Mirror - Roku-Compatible Smart Mirror Dashboard

This is a Roku-compatible version of the bedside-mirror project, designed to work on older web browsers including those found on Roku devices.

## Features

- **Date and Time Display** - Real-time clock with large, readable fonts
- **Weather Information** - Current weather with temperature and icons
- **Task Management** - Today's tasks and upcoming tasks (mock data for compatibility)
- **News Recap** - Rotating news headlines and descriptions
- **Inspirational Quotes** - Rotating motivational quotes
- **Roommate Status** - Fun status display for roommates
- **Photo Gallery** - Rotating photo carousel with smooth transitions

## Compatibility

This version is specifically designed for older browsers and includes:

- **ES5 JavaScript** - No arrow functions, const/let, or modern syntax
- **Vanilla HTML/CSS/JS** - No React, TypeScript, or modern frameworks
- **XMLHttpRequest** - Instead of modern fetch() API
- **CSS2/3 Features Only** - No modern CSS features like backdrop-blur
- **Simple Animations** - CSS transitions instead of complex animations
- **Fallback Fonts** - Web-safe fonts with Google Fonts as enhancement

## File Structure

```
roku-mirror/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── photos/             # Photo gallery images
└── README.md           # This file
```

## Usage

1. Simply open `index.html` in any web browser
2. The dashboard will automatically start displaying information
3. All data updates automatically at regular intervals

## API Dependencies

- **Weather API**: Uses Open-Meteo API (free, no key required)
- **Tasks**: Uses Todoist API (requires API token)
- **News**: Uses GNews API (free tier: 100 requests/day, no credit card required)

## Customization

### Adding Photos
1. Add your photos to the `photos/` folder
2. Update the `photos` array in `script.js`

### Modifying Quotes
1. Edit the `quotes` array in `script.js`
2. Add or remove quote objects with `text` and `author` properties

### Changing Roommate Status
1. Edit the roommate data in the HTML file
2. Update the `roommate-list` section in `index.html`

### Styling
1. Modify `styles.css` to change colors, fonts, or layout
2. All styles use standard CSS properties for maximum compatibility

## Browser Support

This version is compatible with:
- Internet Explorer 9+
- Older versions of Chrome, Firefox, Safari
- Roku web browsers
- Other embedded browser environments

## Performance

- Lightweight and fast loading
- Minimal external dependencies
- Optimized for low-power devices
- Efficient DOM manipulation

## Deployment

This is a static website that can be deployed to:
- Any web server
- GitHub Pages
- Netlify
- Vercel
- Or simply opened locally in a browser
