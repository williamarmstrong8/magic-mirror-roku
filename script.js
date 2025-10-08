// Roku-compatible JavaScript for the mirror dashboard
// Using ES5 syntax and avoiding modern features

(function() {
    'use strict';
    
    // Photo list - all available photos
    var photos = [
        'ellie-bday.JPG',
        'ellie-champagne.jpg',
        'ellie-cup.jpg',
        'huddy-lim-will.JPG',
        'IMG_0511.JPG',
        'IMG_0556.JPG',
        'IMG_1068.jpeg',
        'IMG_1072.jpeg',
        'IMG_1098.jpeg',
        'IMG_1111.jpeg',
        'IMG_1128.JPG',
        'IMG_1177.jpeg',
        'IMG_1389.jpeg',
        'IMG_1417.jpeg',
        'IMG_1451.jpeg',
        'IMG_1469.jpeg',
        'IMG_1493.jpeg',
        'IMG_1537.jpeg',
        'IMG_1588.jpeg',
        'IMG_1720.jpeg',
        'IMG_2039.jpeg',
        'IMG_2725.JPG',
        'IMG_2845.jpeg',
        'IMG_3312.jpeg',
        'IMG_4130.JPG',
        'IMG_4190.JPG',
        'IMG_4310.JPG',
        'IMG_4345.jpeg',
        'IMG_4721.jpeg',
        'IMG_6451.JPG',
        'IMG_6459.JPG',
        'IMG_6462.JPG',
        'IMG_6464.JPG',
        'IMG_6472.JPG',
        'IMG_8117.jpeg',
        'IMG_8138.jpeg',
        'IMG_8198.jpeg',
        'IMG_8221.jpeg',
        'IMG_8280.jpeg',
        'IMG_8309.jpeg',
        'IMG_8331.jpeg',
        'IMG_8335.jpeg',
        'IMG_8496.jpeg',
        'IMG_9372.jpeg',
        'IMG_9988.jpeg',
        'modbrew-window.JPG',
        'modbrew.jpg'
    ];
    
    // Quotes array
    var quotes = [
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill"
        },
        {
            text: "Believe you can and you're halfway there.",
            author: "Theodore Roosevelt"
        },
        {
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
        },
        {
            text: "It does not matter how slowly you go as long as you do not stop.",
            author: "Confucius"
        },
        {
            text: "Everything you've ever wanted is on the other side of fear.",
            author: "George Addair"
        },
        {
            text: "The only impossible journey is the one you never begin.",
            author: "Tony Robbins"
        },
        {
            text: "In the middle of every difficulty lies opportunity.",
            author: "Albert Einstein"
        },
        {
            text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
            author: "Ralph Waldo Emerson"
        },
        {
            text: "The best time to plant a tree was 20 years ago. The second best time is now.",
            author: "Chinese Proverb"
        }
    ];
    
    // News data
    var newsArticles = [];
    
    // Global variables
    var currentPhotoIndex = 0;
    var currentQuoteIndex = 0;
    var currentNewsIndex = 0;
    var weatherData = null;
    
    // DOM elements
    var timeElement = document.getElementById('time');
    var dateElement = document.getElementById('date');
    var weatherIconElement = document.getElementById('weatherIcon');
    var temperatureElement = document.getElementById('temperature');
    var tasksListElement = document.getElementById('tasksList');
    var newsSourceElement = document.getElementById('newsSource');
    var newsDateElement = document.getElementById('newsDate');
    var newsContentElement = document.getElementById('newsContent');
    var newsIndicatorsElement = document.getElementById('newsIndicators');
    
    // News article elements
    var newsArticleElements = [
        document.getElementById('newsArticle0'),
        document.getElementById('newsArticle1'),
        document.getElementById('newsArticle2')
    ];
    var newsHeadlineElements = [
        document.getElementById('newsHeadline0'),
        document.getElementById('newsHeadline1'),
        document.getElementById('newsHeadline2')
    ];
    var newsDescriptionElements = [
        document.getElementById('newsDescription0'),
        document.getElementById('newsDescription1'),
        document.getElementById('newsDescription2')
    ];
    var quoteTextElement = document.getElementById('quoteText');
    var quoteAuthorElement = document.getElementById('quoteAuthor');
    var currentPhotoElement = document.getElementById('currentPhoto');
    var nextPhotoElement = document.getElementById('nextPhoto');
    var prevPhotoElement = document.getElementById('prevPhoto');
    
    // Utility functions
    function getApiToken(tokenName) {
        // Check if API keys are defined in config.js
        if (tokenName === 'TODOIST_API_TOKEN' && typeof TODOIST_API_TOKEN !== 'undefined') {
            return TODOIST_API_TOKEN;
        }
        if (tokenName === 'GNEWS_API_KEY' && typeof GNEWS_API_KEY !== 'undefined') {
            return GNEWS_API_KEY;
        }
        
        // Return null if not configured
        return null;
    }
    
    function formatTime(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }
    
    function formatDate(date) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate();
    }
    
    function formatDateShort(dateString) {
        var date = new Date(dateString);
        var today = new Date();
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate();
        }
    }
    
    function getWeatherIcon(weathercode) {
        if (weathercode === 0) return '☀️';
        if (weathercode <= 3) return '⛅';
        if (weathercode <= 48) return '☁️';
        if (weathercode <= 67) return '🌧️';
        if (weathercode <= 77) return '❄️';
        if (weathercode <= 82) return '🌧️';
        if (weathercode <= 86) return '❄️';
        if (weathercode <= 99) return '⛈️';
        return '🌤️';
    }
    
    // Date and Time functions
    function updateDateTime() {
        var now = new Date();
        timeElement.textContent = formatTime(now);
        dateElement.textContent = formatDate(now);
    }
    
    // Weather functions
    function fetchWeather() {
        // Using XMLHttpRequest for better compatibility
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.open-meteo.com/v1/forecast?latitude=42.3265&longitude=-71.1656&current_weather=true&temperature_unit=fahrenheit', true);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        weatherData = data.current_weather;
                        updateWeatherDisplay();
                    } catch (e) {
                        console.error('Error parsing weather data:', e);
                        showWeatherError();
                    }
                } else {
                    console.error('Weather API error:', xhr.status);
                    showWeatherError();
                }
            }
        };
        
        xhr.send();
    }
    
    function updateWeatherDisplay() {
        if (weatherData) {
            weatherIconElement.textContent = getWeatherIcon(weatherData.weathercode);
            temperatureElement.textContent = Math.round(weatherData.temperature) + '°F';
        }
    }
    
    function showWeatherError() {
        weatherIconElement.textContent = '🌤️';
        temperatureElement.textContent = 'N/A';
    }
    
    // Tasks functions
    function loadTasks() {
        // Get API token from environment or use placeholder
        var apiToken = getApiToken('TODOIST_API_TOKEN');
        
        if (!apiToken) {
            showTasksError('API token not found');
            return;
        }
        
        // Fetch tasks using XMLHttpRequest for compatibility
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.todoist.com/rest/v2/tasks', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + apiToken);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var allTasks = JSON.parse(xhr.responseText);
                        processTasks(allTasks);
                    } catch (e) {
                        console.error('Error parsing tasks data:', e);
                        showTasksError('Failed to parse tasks');
                    }
                } else {
                    console.error('Todoist API error:', xhr.status);
                    showTasksError('Failed to fetch tasks');
                }
            }
        };
        
        xhr.send();
    }
    
    function processTasks(allTasks) {
        // Get today's date in YYYY-MM-DD format
        var today = new Date();
        var todayDate = today.getFullYear() + '-' + 
                       String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                       String(today.getDate()).padStart(2, '0');
        
        // Separate tasks into today and future
        var todayTasks = [];
        var futureTasks = [];
        
        for (var i = 0; i < allTasks.length; i++) {
            var task = allTasks[i];
            if (task.due && task.due.date) {
                if (task.due.date === todayDate) {
                    todayTasks.push(task);
                } else if (task.due.date > todayDate) {
                    futureTasks.push(task);
                }
            }
        }
        
        // Sort future tasks by date
        futureTasks.sort(function(a, b) {
            return new Date(a.due.date) - new Date(b.due.date);
        });
        
        displayTasks(todayTasks, futureTasks);
    }
    
    function showTasksError(message) {
        tasksListElement.innerHTML = '<li class="task-item"><span class="task-text error">' + message + '</span></li>';
    }
    
    function displayTasks(todayTasks, futureTasks) {
        // Clear existing tasks
        tasksListElement.innerHTML = '';
        
        if (todayTasks.length === 0) {
            var noTasksItem = document.createElement('li');
            noTasksItem.className = 'task-item';
            noTasksItem.innerHTML = '<span class="task-text">No tasks for today!</span>';
            tasksListElement.appendChild(noTasksItem);
        } else {
            for (var i = 0; i < todayTasks.length; i++) {
                var task = todayTasks[i];
                var taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                taskItem.innerHTML = '<div class="task-checkbox"></div><span class="task-text">' + task.content + '</span>';
                tasksListElement.appendChild(taskItem);
            }
        }
    }
    
    // News functions (using GNews API)
    function fetchNews() {
        // Get API key from config
        var apiKey = getApiToken('GNEWS_API_KEY');
        
        if (!apiKey) {
            showNewsError('News API key not configured');
            console.log('Please add your GNews API key to config.js');
            console.log('Get a free key at: https://gnews.io/');
            return;
        }
        
        // Check if we've already fetched news today
        var lastFetchDate = localStorage.getItem('lastNewsFetch');
        var today = new Date().toDateString();
        
        if (lastFetchDate === today) {
            // Already fetched today, load from cache
            var cachedNews = localStorage.getItem('cachedNews');
            if (cachedNews) {
                try {
                    newsArticles = JSON.parse(cachedNews);
                    currentNewsIndex = 0;
                    updateNews();
                    console.log('Loading cached news from today');
                    return;
                } catch (e) {
                    console.error('Error loading cached news:', e);
                }
            }
        }
        
        // Fetch news using XMLHttpRequest for Roku compatibility
        // Try Vercel API route first, fallback to CORS proxy
        // GNews API: Free tier allows 100 requests/day, max 10 articles per request
        // We only fetch once per day to stay well under the limit
        
        // First try the Vercel API route (better solution)
        var apiUrl = window.location.origin + '/api/news';
        var fallbackUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=3&apikey=' + apiKey);
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl, true);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        if (data.articles && data.articles.length > 0) {
                            newsArticles = data.articles;
                            currentNewsIndex = 0;
                            
                            // Cache the news articles
                            localStorage.setItem('cachedNews', JSON.stringify(newsArticles));
                            localStorage.setItem('lastNewsFetch', today);
                            
                            updateNews();
                            console.log('Fetched fresh news articles');
                        } else {
                            showNewsError('No news articles found');
                        }
                    } catch (e) {
                        console.error('Error parsing news data:', e);
                        showNewsError('Failed to parse news data');
                    }
                } else {
                    console.error('Vercel API error:', xhr.status);
                    // Fallback to CORS proxy
                    console.log('Trying fallback CORS proxy...');
                    tryCorsProxy();
                }
            }
        };
        
        xhr.onerror = function() {
            console.log('Vercel API failed, trying fallback CORS proxy...');
            tryCorsProxy();
        };
        
        xhr.send();
        
        // Fallback function to try CORS proxy
        function tryCorsProxy() {
            var fallbackXhr = new XMLHttpRequest();
            fallbackXhr.open('GET', fallbackUrl, true);
            
            fallbackXhr.onreadystatechange = function() {
                if (fallbackXhr.readyState === 4) {
                    if (fallbackXhr.status === 200) {
                        try {
                            var data = JSON.parse(fallbackXhr.responseText);
                            if (data.articles && data.articles.length > 0) {
                                newsArticles = data.articles;
                                currentNewsIndex = 0;
                                
                                // Cache the news articles
                                localStorage.setItem('cachedNews', JSON.stringify(newsArticles));
                                localStorage.setItem('lastNewsFetch', today);
                                
                                updateNews();
                                console.log('Fetched news via CORS proxy');
                            } else {
                                showNewsError('No news articles found');
                            }
                        } catch (e) {
                            console.error('Error parsing news data from proxy:', e);
                            showNewsError('Failed to parse news data');
                        }
                    } else {
                        console.error('CORS proxy error:', fallbackXhr.status);
                        if (fallbackXhr.status === 403) {
                            showNewsError('Invalid API key');
                        } else if (fallbackXhr.status === 429) {
                            showNewsError('API rate limit exceeded');
                        } else {
                            showNewsError('Failed to fetch news');
                        }
                    }
                }
            };
            
            fallbackXhr.send();
        }
    }
    
    function updateNews() {
        if (newsArticles.length === 0) {
            showNewsError('No news available');
            return;
        }
        
        // Make sure all articles are visible
        for (var k = 0; k < 3; k++) {
            newsArticleElements[k].style.display = 'block';
        }
        
        // Update all article content
        for (var i = 0; i < 3; i++) {
            if (i < newsArticles.length) {
                var article = newsArticles[i];
                newsHeadlineElements[i].textContent = article.title || 'No title';
                newsDescriptionElements[i].textContent = article.description || 'No description available';
            } else {
                // Hide extra articles if we have fewer than 3
                newsArticleElements[i].style.display = 'none';
            }
        }
        
        // Set initial active state
        for (var m = 0; m < 3; m++) {
            newsArticleElements[m].classList.remove('active');
        }
        newsArticleElements[currentNewsIndex].classList.add('active');
        
        // Update source and date for current article
        var currentArticle = newsArticles[currentNewsIndex];
        newsSourceElement.textContent = currentArticle.source.name || 'Unknown Source';
        newsDateElement.textContent = new Date(currentArticle.publishedAt).toLocaleDateString();
        
        // Update indicators
        newsIndicatorsElement.innerHTML = '';
        for (var j = 0; j < newsArticles.length; j++) {
            var indicator = document.createElement('div');
            indicator.className = 'news-indicator' + (j === currentNewsIndex ? ' active' : '');
            newsIndicatorsElement.appendChild(indicator);
        }
    }
    
    function nextNews() {
        if (newsArticles.length > 1) {
            // Start fade out animation
            newsArticleElements[currentNewsIndex].classList.remove('active');
            
            // Wait for fade out to complete, then fade in next article
            setTimeout(function() {
                // Move to next article
                currentNewsIndex = (currentNewsIndex + 1) % newsArticles.length;
                
                // Add active class to new article (fade in)
                newsArticleElements[currentNewsIndex].classList.add('active');
                
                // Update source and date for current article
                var currentArticle = newsArticles[currentNewsIndex];
                newsSourceElement.textContent = currentArticle.source.name || 'Unknown Source';
                newsDateElement.textContent = new Date(currentArticle.publishedAt).toLocaleDateString();
                
                // Update indicators
                newsIndicatorsElement.innerHTML = '';
                for (var i = 0; i < newsArticles.length; i++) {
                    var indicator = document.createElement('div');
                    indicator.className = 'news-indicator' + (i === currentNewsIndex ? ' active' : '');
                    newsIndicatorsElement.appendChild(indicator);
                }
            }, 800); // Wait for fade out to complete (0.8s)
        }
    }
    
    function showNewsError(message) {
        newsSourceElement.textContent = 'Error';
        newsDateElement.textContent = 'N/A';
        newsHeadlineElements[0].textContent = message;
        newsDescriptionElements[0].textContent = 'Please check your API configuration.';
        newsIndicatorsElement.innerHTML = '';
        
        // Hide other articles
        newsArticleElements[1].style.display = 'none';
        newsArticleElements[2].style.display = 'none';
    }
    
    // Quotes functions
    function updateQuote() {
        var quote = quotes[currentQuoteIndex];
        quoteTextElement.textContent = '"' + quote.text + '"';
        quoteAuthorElement.textContent = '— ' + quote.author;
    }
    
    function nextQuote() {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        updateQuote();
    }
    
    // Photo functions with fade-in animation for transitions
    function updatePhotos() {
        if (photos.length === 0) return;
        
        // Calculate indices for 5-photo display
        var farLeftIndex = (currentPhotoIndex - 2 + photos.length) % photos.length;
        var prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        var nextIndex = (currentPhotoIndex + 1) % photos.length;
        var farRightIndex = (currentPhotoIndex + 2) % photos.length;
        
        // Update all photo sources
        var farLeftPhotoElement = document.getElementById('farLeftPhoto');
        var farRightPhotoElement = document.getElementById('farRightPhoto');
        
        if (farLeftPhotoElement) farLeftPhotoElement.src = 'photos/' + photos[farLeftIndex];
        if (prevPhotoElement) prevPhotoElement.src = 'photos/' + photos[prevIndex];
        if (currentPhotoElement) currentPhotoElement.src = 'photos/' + photos[currentPhotoIndex];
        if (nextPhotoElement) nextPhotoElement.src = 'photos/' + photos[nextIndex];
        if (farRightPhotoElement) farRightPhotoElement.src = 'photos/' + photos[farRightIndex];
    }
    
    function nextPhoto() {
        if (photos.length === 0) return;
        
        // Get all photo elements
        var farLeftPhotoElement = document.getElementById('farLeftPhoto');
        var prevPhotoElement = document.getElementById('prevPhoto');
        var currentPhotoElement = document.getElementById('currentPhoto');
        var nextPhotoElement = document.getElementById('nextPhoto');
        var farRightPhotoElement = document.getElementById('farRightPhoto');
        
        if (!farLeftPhotoElement || !prevPhotoElement || !currentPhotoElement || !nextPhotoElement || !farRightPhotoElement) {
            return;
        }
        
        // Move to next photo index
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        
        // Calculate the index for the new photo that will appear on the far right
        var newFarRightIndex = (currentPhotoIndex + 2) % photos.length;
        
        // Prepare the far-left element to become the new far-right
        // Update its source and position it off-screen to the right with opacity 0
        farLeftPhotoElement.style.transition = 'none'; // Disable transition temporarily
        farLeftPhotoElement.src = 'photos/' + photos[newFarRightIndex];
        farLeftPhotoElement.style.left = '768px'; // Start off-screen to the right
        farLeftPhotoElement.style.opacity = '0';
        farLeftPhotoElement.style.transform = 'scale(0.9)';
        farLeftPhotoElement.style.zIndex = '1';
        
        // Force a reflow to ensure the transition:none takes effect
        void farLeftPhotoElement.offsetWidth;
        
        // Re-enable transitions with smoother timing
        farLeftPhotoElement.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Small delay to ensure transition is re-enabled
        setTimeout(function() {
            // Animate all photos simultaneously:
            // 1. The new photo (currently off-screen right) fades in and slides to far-right position
            farLeftPhotoElement.style.left = '640px';
            farLeftPhotoElement.style.opacity = '1';
            
            // 2. All other photos slide left by one position
            prevPhotoElement.style.left = '0';
            prevPhotoElement.style.transform = 'scale(0.9)';
            prevPhotoElement.style.zIndex = '1';
            
            currentPhotoElement.style.left = '128px';
            currentPhotoElement.style.transform = 'scale(0.95)';
            currentPhotoElement.style.zIndex = '2';
            
            nextPhotoElement.style.left = '320px';
            nextPhotoElement.style.transform = 'scale(1.05)';
            nextPhotoElement.style.zIndex = '3';
            
            farRightPhotoElement.style.left = '512px';
            farRightPhotoElement.style.transform = 'scale(0.95)';
            farRightPhotoElement.style.zIndex = '2';
            
            // After animation completes, swap IDs to maintain correct references
            setTimeout(function() {
                var tempElement = farLeftPhotoElement;
                
                farLeftPhotoElement.id = 'tempPhoto';
                prevPhotoElement.id = 'farLeftPhoto';
                currentPhotoElement.id = 'prevPhoto';
                nextPhotoElement.id = 'currentPhoto';
                farRightPhotoElement.id = 'nextPhoto';
                tempElement.id = 'farRightPhoto';
            }, 1200); // Wait for the slide animation to complete (1.2s)
            
        }, 50); // Small delay to ensure DOM is ready
    }
    
    // Initialize the application
    function init() {
        // Set initial time
        updateDateTime();
        
        // Set up intervals
        setInterval(updateDateTime, 1000);
        setInterval(nextNews, 8000);
        setInterval(nextQuote, 5 * 60 * 60 * 1000); // 5 hours
        setInterval(nextPhoto, 5000); // 5 seconds
        
        // Load initial data
        fetchWeather();
        loadTasks();
        fetchNews();
        updateQuote();
        updatePhotos();
        
        // Refresh data at intervals
        setInterval(fetchWeather, 10 * 60 * 1000); // 10 minutes
        setInterval(loadTasks, 5 * 60 * 1000); // 5 minutes
        // News is fetched once per day (cached in localStorage)
    }
    
    // Start the application when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();

