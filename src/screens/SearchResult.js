import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import searchByTitle from '../services/MovieService';
import searchByGenre from '../services/SearchGenreService'; // Import the genre search service
import fetchShowsByRating from '../services/RatingSearchService'; // Service for rating search
import Card from '../components/Card';
import '../styles/styles.css'; // Import the CSS file

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search'); // Search query
  const searchType = searchParams.get('type'); // Get the search type
  const genres = searchParams.get('genres'); // For genre search
  const minRating = searchParams.get('minRating'); // Minimum rating
  const maxRating = searchParams.get('maxRating'); // Maximum rating
  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState(''); // Default to no sorting
  const [error, setError] = useState(null); // State for error handling

  const fetchMovies = async () => {
    setError(null); // Reset error state
    let data = null;

    try {
      if (searchType === 'title' && query) {
        data = await searchByTitle(query);
      } else if (searchType === 'genre' && genres) {
        data = await searchByGenre(genres);
        console.log(data)
      } else if (searchType === 'rating' && minRating && maxRating) {
        data = await fetchShowsByRating(parseInt(minRating), parseInt(maxRating));
        data = data.shows
        // console.log()
      }

      if (data) {
        console.log("Setting Results")
        setResults(Array.isArray(data) ? data : [data]); // Ensure it's an array
      }
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query, searchType, genres, minRating, maxRating]);

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
      <div className="header">
        <h2>Results for "{query || genres || `${minRating}-${maxRating}`}"</h2>
        <button
          onClick={handleHome}
          style={{
            marginTop: '10px',
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Back to Home
        </button>
      </div>

      {/* Dropdown for sorting */}
      <div style={{ marginBottom: '1rem', marginTop: '20px' }}>
        {/* <label htmlFor="sort" style={{ marginRight: '10px', color: 'white' }}>Sort By:</label> */}
        <select id="sort" value={sortOption} onChange={handleSort}>
          <option value="" disabled>
            Select sorting option
          </option>
          <option value="alphabetical">Sort by Alphabetical Order</option>
          <option value="rating">Sort by Rating</option>
          <option value="date">Sort by Release Date</option>
        </select>
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        <div className="results-list">
          {results.map((result, index) => (
            <Card
              key={index}
              id={result.id}
              title={result.title}
              image={result.imageSet?.verticalPoster?.w240}
              overview={result.overview}
              releaseYear={result.releaseYear}
              rating={result.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
