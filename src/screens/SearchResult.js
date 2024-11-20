import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import searchByTitle from '../services/MovieService';
import searchByGenre from '../services/SearchGenreService'; // Import the genre search service
import Card from '../components/Card';
import '../styles/styles.css'; // Import the CSS file
import backgroundImage from '../styles/img.jpg'; // Import the background image

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search'); // Search query
  const searchType = searchParams.get('type'); // Get the search type (title or genre)
  const genres = searchParams.get('genres'); // For genre search
  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState(''); // Default to no sorting
  const [newQuery, setNewQuery] = useState(query || ''); // State for new search query
  const [error, setError] = useState(null); // State for error handling

  const fetchMovies = async () => {
    setError(null); // Reset error state
    let data = null;

    try {
      // Check the search type and call the appropriate service
      if (searchType === 'title' && query) {
        data = await searchByTitle(query);
      } else if (searchType === 'genre' && genres) {
        data = await searchByGenre(genres);
      }

      if (data) {
        setResults(Array.isArray(data) ? data : [data]); // Ensure it's an array
      }
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query, searchType, genres]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (newQuery.trim()) {
      navigate(`/results?search=${newQuery}&type=title`);
    }
  };

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedResults = [...results];
    if (option === 'alphabetical') {
      sortedResults.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === 'rating') {
      sortedResults.sort((a, b) => b.rating - a.rating);
    } else if (option === 'date') {
      sortedResults.sort((a, b) => b.releaseYear - a.releaseYear);
    }

    setResults(sortedResults);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="banner">Movie Search</div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" className="home-button" onClick={handleHome}>Home</button>
      </form>

      <h2>Results for "{query || genres}"</h2>

      {/* Dropdown for sorting */}
      <select
        value={sortOption}
        onChange={handleSort}
        style={{ marginBottom: '1rem' }}
      >
        <option value="" disabled>
          Select sorting option
        </option>
        <option value="alphabetical">Sort by Alphabetical Order</option>
        <option value="rating">Sort by Rating</option>
        <option value="date">Sort by Release Date</option>
      </select>

      {error ? (
        <div>
          <p>{error}</p>
          <button onClick={fetchMovies}>Retry</button>
        </div>
      ) : (
        <div className="results-list">
          {results.length > 0 ? (
            results.map((result, index) => (
              <Card
                key={index}
                id={result.id}
                title={result.title}
                image={result.imageSet?.verticalPoster?.w240}
                overview={result.overview}
                releaseYear={result.releaseYear}
                rating={result.rating}
              />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
