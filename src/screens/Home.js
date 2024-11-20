import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchByTitle from '../services/MovieService';
import searchByGenre from '../services/SearchGenreService'; // Import the genre search service
import Card from '../components/Card';

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState(''); // State for search query
  const [searchType, setSearchType] = useState('title'); // State for search type (title or genre)
  const [genres, setGenres] = useState(''); // State for genre search
  const [results, setResults] = useState([]);
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?search=${query}&type=${searchType}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="genre">Genre</option>
        </select>
        {searchType === 'genre' && (
          <input
            type="text"
            placeholder="Enter genres..."
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
          />
        )}
        <button type="submit">Search</button>
      </form>

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

export default Home;
