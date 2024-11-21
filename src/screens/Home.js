import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getGenres from '../services/GetGenreService'; // Service for fetching genres
import '../styles/styles.css'; // Import CSS file

function Home() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState(''); // State for search type
  const [genres, setGenres] = useState([]); // State for list of genres
  const [selectedGenre, setSelectedGenre] = useState(''); // Selected genre
  const [query, setQuery] = useState(''); // Search query for title
  const [ratingMin, setRatingMin] = useState(''); // Minimum rating
  const [ratingMax, setRatingMax] = useState(''); // Maximum rating
  const [error, setError] = useState(null); // State for error handling

  // Fetch genres when 'searchType' is set to 'genre'
  useEffect(() => {
    const fetchGenres = async () => {
      if (searchType === 'genre') {
        try {
          const genreList = await getGenres();
          if (genreList) {
            setGenres(genreList); // Populate the genre dropdown
          }
        } catch (err) {
          setError('Failed to fetch genres. Please try again.');
        }
      }
    };

    fetchGenres();
  }, [searchType]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (searchType === 'title' && query.trim()) {
      navigate(`/results?search=${query}&type=title`);
    } else if (searchType === 'genre' && selectedGenre) {
      navigate(`/results?genres=${selectedGenre}&type=genre`);
    } else if (searchType === 'rating' && ratingMin && ratingMax) {
      navigate(`/results?minRating=${ratingMin}&maxRating=${ratingMax}&type=rating`);
    } else {
      setError('Please provide valid inputs for your search.');
    }
  };

  return (
    <div className="container">
      <div className="banner">Movie Search</div>
      <form onSubmit={handleSearch}>
        {/* Dropdown for selecting search type */}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">Select Search Type</option>
          <option value="title">Title</option>
          <option value="genre">Genre</option>
          <option value="rating">Rating</option>
        </select>

        {/* Input for Title Search */}
        {searchType === 'title' && (
          <div>
            <input
              type="text"
              placeholder="Search by title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        )}

        {/* Dropdown for Genre Search */}
        {searchType === 'genre' && (
          <div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Input for Rating Search */}
        {searchType === 'rating' && (
          <div>
            <input
              type="number"
              placeholder="Min Rating"
              value={ratingMin}
              onChange={(e) => setRatingMin(e.target.value)}
              min="0"
              max="100"
            />
            <input
              type="number"
              placeholder="Max Rating"
              value={ratingMax}
              onChange={(e) => setRatingMax(e.target.value)}
              min="0"
              max="100"
            />
          </div>
        )}

        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Home;
