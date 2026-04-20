import { API_URL } from '@/lib/config';

export class Movie {
  /**
   * Gets a single movie or series by its ID and type.
   */
 static async get(id, type) {
    if (!id || !type) return null;
    try {
      // Corrected IP address
      const response = await fetch(`${API_URL}/details?id=${id}&type=${type}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
      return null;
    }
  }

  // ... the filter function remains the same ...
 static async filter(query = {}, sort = '-rating', limit = 8) {
    console.log(`Filtering movies for similar content with query:`, { query, sort, limit });
    try {
      const params = new URLSearchParams();
      if (query.genre) {
        params.append('genre', query.genre);
      }
      // Add other potential filters here if needed in the future

      const response = await fetch(`${API_URL}/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      const combinedResults = [...(data.movies || []), ...(data.series || [])];
      
      // Filter out the current movie from the "similar" list
      const currentMovieId = query.id ? query.id['$ne'] : null;
      if (currentMovieId) {
        const similarContent = combinedResults.filter(item => item.id !== currentMovieId);
        return similarContent.slice(0, limit); // Return up to the limit
      }

      return combinedResults.slice(0, limit);

    } catch (error) {
      console.error("Failed to fetch similar movies:", error);
      return []; // Return empty on error
    }
  }
}