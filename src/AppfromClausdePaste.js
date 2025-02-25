import React, { useState, useEffect } from 'react';
import './App.css';

// API key and base URL
const API_KEY = 'ca3674f8';
const API_URL = 'https://www.omdbapi.com/';  // Changed to https

function App() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Sample movie IDs for featured section
  const featuredMovieIds = [
    'tt0816692', // Interstellar
    'tt0468569', // The Dark Knight
    'tt0111161', // The Shawshank Redemption
    'tt1375666', // Inception
    'tt0133093', // The Matrix
    'tt0110912', // Pulp Fiction
  ];

  // Sample movie IDs for trending section
  const trendingMovieIds = [
    'tt1160419', // Dune
    'tt2382320', // No Time to Die
    'tt3480822', // Black Widow
    'tt9376612', // Shang-Chi
    'tt6264654', // Free Guy
    'tt6334354', // The Suicide Squad
  ];

  useEffect(() => {
    // Fetch featured movies
    const fetchFeaturedMovies = async () => {
      try {
        setLoading(true);
        const promises = featuredMovieIds.map(id =>
          fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
        );
        
        const results = await Promise.all(promises);
        setMovies(results.filter(movie => movie.Response === 'True'));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching featured movies:", err);
        setError("Failed to load featured movies. Please try again later.");
        setLoading(false);
      }
    };

    // Fetch trending movies
    const fetchTrendingMovies = async () => {
      try {
        const promises = trendingMovieIds.map(id =>
          fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
        );
        
        const results = await Promise.all(promises);
        setTrendingMovies(results.filter(movie => movie.Response === 'True'));
      } catch (err) {
        console.error("Error fetching trending movies:", err);
        setError("Failed to load trending movies. Please try again later.");
      }
    };

    fetchFeaturedMovies();
    fetchTrendingMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (searchTerm.trim() === '') return;
    
    try {
      setLoading(true);
      setSearchPerformed(true);
      
      // Log the search URL for debugging
      const searchUrl = `${API_URL}?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`;
      console.log("Searching with URL:", searchUrl);
      
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Search results:", data);
      
      if (data.Response === 'True') {
        setMovies(data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError(data.Error || "No results found");
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Search error:", err);
      setError(`Search failed: ${err.message}`);
      setMovies([]);
      setLoading(false);
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      setLoading(true);
      setSearchPerformed(true);
      setSearchTerm(category); // Update the search term to match the category
      
      const searchUrl = `${API_URL}?s=${encodeURIComponent(category)}&type=movie&apikey=${API_KEY}`;
      console.log("Category search URL:", searchUrl);
      
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Category results:", data);
      
      if (data.Response === 'True') {
        setMovies(data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError(data.Error || "No results found for this category");
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Category search error:", err);
      setError(`Category search failed: ${err.message}`);
      setMovies([]);
      setLoading(false);
    }
  };

  // Reset search and show featured movies again
  const handleResetSearch = () => {
    setSearchPerformed(false);
    setSearchTerm('');
    setError(null);
  };

  return (
    <div className="app">
      <header>
        <a href="/" className="logo" onClick={(e) => { e.preventDefault(); handleResetSearch(); }}>Find-a-Film</a>
        <nav>
          <ul>
            <li><a href="/" onClick={(e) => { e.preventDefault(); handleResetSearch(); }}>Home</a></li>
            <li><a href="/movies" onClick={(e) => e.preventDefault()}>Movies</a></li>
            <li><a href="/tvshows" onClick={(e) => e.preventDefault()}>TV Shows</a></li>
            <li><a href="/watchlist" onClick={(e) => e.preventDefault()}>Watchlist</a></li>
            <li><a href="/signin" onClick={(e) => e.preventDefault()}>Sign In</a></li>
          </ul>
        </nav>
      </header>
      
      <section className="hero">
        <h1>Discover Your Next Favorite Movie</h1>
        <p>Search through thousands of films, get personalized recommendations, and create your ultimate watchlist.</p>
        
        <form onSubmit={handleSearch} className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for movies, actors, directors..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
        
        <div className="categories">
          <button className="category-btn" onClick={() => handleCategoryClick('action')}>Action</button>
          <button className="category-btn" onClick={() => handleCategoryClick('comedy')}>Comedy</button>
          <button className="category-btn" onClick={() => handleCategoryClick('drama')}>Drama</button>
          <button className="category-btn" onClick={() => handleCategoryClick('sci-fi')}>Sci-Fi</button>
          <button className="category-btn" onClick={() => handleCategoryClick('horror')}>Horror</button>
          <button className="category-btn" onClick={() => handleCategoryClick('thriller')}>Thriller</button>
        </div>
      </section>
      
      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
          <button className="reset-btn" onClick={handleResetSearch}>Back to Featured Movies</button>
        </div>
      ) : (
        <>
          <section className="featured">
            <h2 className="section-title">
              {searchPerformed ? `Search Results for "${searchTerm}"` : "Featured Movies"}
              {searchPerformed && (
                <button className="reset-btn" onClick={handleResetSearch}>Back to Featured</button>
              )}
            </h2>
            {movies.length > 0 ? (
              <div className="movie-grid">
                {movies.map((movie) => (
                  <div className="movie-card" key={movie.imdbID}>
                    <img 
                      src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'} 
                      alt={`${movie.Title} poster`} 
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x300?text=Error+Loading+Image';
                      }}
                    />
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.Title}</h3>
                      <div className="movie-details">
                        <span>{movie.Year}</span>
                        <span>{movie.imdbRating ? `${movie.imdbRating}/10` : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !searchPerformed && !error && <div className="no-results">No movies to display</div>
            )}
          </section>
          
          {!searchPerformed && (
            <section className="trending">
              <h2 className="section-title">Trending Now</h2>
              {trendingMovies.length > 0 ? (
                <div className="movie-grid">
                  {trendingMovies.map((movie) => (
                    <div className="movie-card" key={movie.imdbID}>
                      <img 
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'} 
                        alt={`${movie.Title} poster`} 
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x300?text=Error+Loading+Image';
                        }}
                      />
                      <div className="movie-info">
                        <h3 className="movie-title">{movie.Title}</h3>
                        <div className="movie-details">
                          <span>{movie.Year}</span>
                          <span>{movie.imdbRating ? `${movie.imdbRating}/10` : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">No trending movies to display</div>
              )}
            </section>
          )}
        </>
      )}
      
      <footer>
        <div className="footer-links">
          <a href="/about" onClick={(e) => e.preventDefault()}>About</a>
          <a href="/contact" onClick={(e) => e.preventDefault()}>Contact</a>
          <a href="/privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          <a href="/terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          <a href="/faq" onClick={(e) => e.preventDefault()}>FAQ</a>
        </div>
        <p className="copyright">© 2025 Find-a-Film. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;