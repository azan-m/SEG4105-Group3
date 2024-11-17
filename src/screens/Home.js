import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getGenres from '../services/GetGenreService';  // Import the service to fetch genres

function Home() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');  // Default to title search
  const [selectedGenres, setSelectedGenres] = useState([]);  // For selected genres
  const [genresList, setGenresList] = useState([]);  // Available genres
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getGenres();  // Fetch the list of genres
      setGenresList(genres);
    };
    fetchGenres();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchType === 'title' && query.trim()) {
      navigate(`/results?search=${query}&type=title`);
    } else if (searchType === 'genre' && selectedGenres.length > 0) {
      const genres = selectedGenres.join(',');  // Join selected genres into a comma-separated string
      navigate(`/results?genres=${genres}&type=genre`);
    }
  };

  const handleGenreChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);  // Handle multiselect
    setSelectedGenres(selected);
  };

  return (
    <div className="home">
      <h1>Search for Movies</h1>
      <form onSubmit={handleSearch}>
        {/* Input for title search */}
        {searchType === 'title' && (
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}

        {/* Dropdown for selecting genres (only if search type is genre) */}
        {searchType === 'genre' && (
          <select
            multiple
            value={selectedGenres}
            onChange={handleGenreChange}
          >
            {genresList.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        )}

        {/* Dropdown for selecting search type */}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          style={{ marginLeft: '10px' }}
        >
          <option value="title">Title</option>
          <option value="genre">Genre</option>
        </select>

        <button type="submit" style={{ marginLeft: '10px' }}>
          Search
        </button>
      </form>
    </div>
  );
}

export default Home;
