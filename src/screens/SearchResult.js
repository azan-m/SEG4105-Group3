import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import searchByTitle from '../services/MovieService';
import searchByGenre from '../services/SearchGenreService'; // Import the genre search service
import Card from '../components/Card';

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search'); // Search query
  const searchType = searchParams.get('type'); // Get the search type (title or genre)
  const genres = searchParams.get('genres'); // For genre search
  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState(''); // Default to no sorting

  useEffect(() => {
    const fetchMovies = async () => {
      let data = null;

      // Check the search type and call the appropriate service
      if (searchType === 'title' && query) {
        data = await searchByTitle(query);
      } else if (searchType === 'genre' && genres) {
        data = await searchByGenre(genres);
      }

      if (data) {
        setResults(Array.isArray(data) ? data : [data]); // Ensure it's an array
        console.log(data);
      }
    };

    fetchMovies();
  }, [query, searchType, genres]);

  // Sorting logic
  const sortedResults = [...results];
  if (sortOption === 'alphabetical') {
    sortedResults.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'rating') {
    sortedResults.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div>
      <h2>Results for "{query || genres}"</h2>

      {/* Dropdown for sorting */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{ marginBottom: '1rem' }}
      >
        <option value="" disabled>
          Select sorting option
        </option>
        <option value="alphabetical">Sort by Alphabetical Order</option>
        <option value="rating">Sort by Rating</option>
      </select>

      <div className="results-list">
        {sortedResults.length > 0 ? (
          sortedResults.map((result, index) => (
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
    </div>
  );
}

export default SearchResults;
