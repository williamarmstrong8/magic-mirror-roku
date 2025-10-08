# API Setup Guide for Roku Mirror

This guide will help you set up the necessary API keys for your Roku Mirror dashboard.

## Required APIs

### 1. Todoist API (Already Configured ✅)
Your Todoist API token is already set up in `config.js`.

### 2. GNews API (Required for News)

#### Step 1: Sign Up for GNews
1. Go to [https://gnews.io/](https://gnews.io/)
2. Click "Get API Key" or "Sign Up"
3. Create a free account (no credit card required)
4. Verify your email address

#### Step 2: Get Your API Key
1. Log in to your GNews account
2. Navigate to your dashboard
3. Copy your API key (it will look like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

#### Step 3: Add API Key to Config
1. Open `config.js` in a text editor
2. Find the line: `// var GNEWS_API_KEY = 'your_gnews_api_key_here';`
3. Uncomment it and replace with your actual key:
   ```javascript
   var GNEWS_API_KEY = 'your_actual_api_key_here';
   ```
4. Save the file

### 3. Weather API (No Setup Required ✅)
The Open-Meteo API is free and requires no API key.

## API Limits

### GNews Free Tier:
- **100 requests per day**
- **Max 10 articles per request**
- The app is configured to fetch news every 60 minutes
- This means approximately 24 requests per day (well under the limit)

### Todoist API:
- No rate limits on standard API calls
- Updates every 5 minutes

### Weather API:
- Free and unlimited for personal use
- Updates every 10 minutes

## Troubleshooting

### News Not Loading
1. Check that your API key is correctly added to `config.js`
2. Make sure you've uncommented the line (removed the `//`)
3. Verify your API key is active at [https://gnews.io/](https://gnews.io/)
4. Check the browser console for error messages

### Tasks Not Loading
1. Verify your Todoist API token is correct
2. Make sure you have tasks with due dates in Todoist
3. Check the browser console for error messages

### Weather Not Loading
1. This should work automatically (no key required)
2. Check your internet connection
3. Check the browser console for error messages

## Testing Your Configuration

1. Open `index.html` in your browser
2. Open the browser's developer console (F12 or right-click > Inspect)
3. Look for any error messages in the console
4. You should see:
   - Weather temperature in the top right
   - Your Todoist tasks in the top left
   - News articles cycling in the center

## Security Note

⚠️ **Important**: Your API keys in `config.js` are visible in the browser. For a public deployment:
- Consider using environment variables
- Or use a server-side proxy to keep keys secure
- The current setup is suitable for personal use on your Roku TV

## Support

- **GNews Documentation**: [https://gnews.io/docs/](https://gnews.io/docs/)
- **Todoist API**: [https://developer.todoist.com/](https://developer.todoist.com/)
- **Open-Meteo**: [https://open-meteo.com/](https://open-meteo.com/)
