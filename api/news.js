// Vercel API route to fetch news and avoid CORS issues
export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get API key from environment variables
    const apiKey = process.env.GNEWS_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        // Fetch news from GNews API
        const response = await fetch(
            `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=3&apikey=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`GNews API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Set CORS headers to allow Roku browser access
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        return res.status(200).json(data);
    } catch (error) {
        console.error('News API error:', error);
        
        // Set CORS headers even for errors
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        return res.status(500).json({ 
            error: 'Failed to fetch news',
            message: error.message 
        });
    }
}
