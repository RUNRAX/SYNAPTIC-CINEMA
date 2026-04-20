import { API_URL } from '@/lib/config';

// The base URL of your running Flask backend
const API_BASE_URL = API_URL;

/**
 * Fetches content from the backend based on a specific category.
 * Used by the Home page for "Trending", "Featured Movies", etc.
 * @param {string} category The category of content to fetch.
 * @returns {Promise<{movies: Array, series: Array}>}
 */
const fetchWithCache = async (cacheKey, url) => {
  // 1. Check session storage for cached data
  const cachedData = sessionStorage.getItem(cacheKey);
  if (cachedData) {
    console.log(`Serving from cache: ${cacheKey}`);
    return JSON.parse(cachedData);
  }

  // 2. If not in cache, fetch from the network
  console.log(`Fetching from network: ${url}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // 3. Save the fresh data to the cache before returning it
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    // Return a default empty state on error
    return { movies: [], series: [] };
  }
};

export const getContent = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/content?category=${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch content for category ${category}:`, error);
    // Return empty arrays so the app doesn't crash
    return { movies: [], series: [] };
  }
};

/**
 * Searches for content based on a query string.
 * Used by the Search page.
 * @param {string} query The user's search term.
 * @returns {Promise<{movies: Array, series: Array}>}
 */
export const searchContent = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch search results for query "${query}":`, error);
    return { movies: [], series: [] };
  }
};

/**
 * Fetches content recommendations based on a detected emotion.
 * Used by the Synaptic page.
 * @param {string} emotion The detected emotion (e.g., 'happy', 'sad').
 * @returns {Promise<{movies: Array, series: Array}>}
 */
export const getEmotionRecommendations = async (emotion) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations?emotion=${emotion}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch recommendations for emotion ${emotion}:`, error);
    return { movies: [], series: [] };
  }
};