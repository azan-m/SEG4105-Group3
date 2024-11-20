import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getMovieDetails from '../services/MovieDetail'; // A function to fetch movie details by ID
import '../styles/MovieDetails.css'; // Assuming you create a separate CSS file for the styling
import '../styles/img.jpg';

function MovieDetails() {
  const { id } = useParams(); // Get the movie id from the URL
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const data = await getMovieDetails(id); // Fetch movie details using the id
      setMovie(data);
    };

    fetchMovieDetails();
  }, [id]);

  const handleHome = () => {
    navigate('/');
  };

  const handleBackToResults = () => {
    navigate(-1); // Go back to the previous page
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    
    <div className="movie-details">
      <div className="button-container">
        <button className="back-button" onClick={handleBackToResults}>Back to Results</button>
        <button className="home-button" onClick={handleHome}>Home</button>
      </div>
      <h1 className="movie-title">{movie.title}</h1>
      <img src={movie.imageSet?.verticalPoster?.w600} alt={movie.title} className="movie-poster"/>
      <p className="movie-overview"><strong>Overview:</strong> {movie.overview}</p>
      <p className="movie-info"><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p className="movie-info"><strong>Rating:</strong> {movie.rating}</p>
      <p className="movie-info"><strong>Cast:</strong> {movie.cast?.join(', ')}</p>
      <p className="movie-info"><strong>Directors:</strong> {movie.directors?.join(', ')}</p>

      {/* Streaming Platforms Section */}
      <h3 className="streaming-header">Available on</h3>
      <div className="streaming-options">
        {movie.streamingOptions ? (
          Object.keys(movie.streamingOptions).map(region => (
            <div key={region}>
              <h4 className="region-title">{region.toUpperCase()}</h4>
              <div className="streaming-services">
                {movie.streamingOptions[region].map((service, index) => (
                  <div key={index} className="streaming-service">
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="service-link"
                    >
                      <img
                        src={service.service.imageSet?.lightThemeImage}
                        alt={service.service.name}
                        className="service-logo"
                      />
                      <p className="service-name">{service.service.name}</p>
                    </a>
                    <p className="service-type">Type: {service.type}</p>
                    <p className="service-quality">Quality: {service.quality}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No streaming options available.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
