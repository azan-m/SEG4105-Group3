import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ id, title, image, overview, releaseYear, rating }) {
  return (
    <Link to={`/movie/${id}`} style={{ textDecoration: 'none' }}>
      <div className="card">
        <img src={image} alt={title} style={{ width: '150px', height: '225px' }} />
        <div className="card-content">
          <h3>{title}</h3>
          <p>{overview}</p>
          <p>Release Year: {releaseYear}</p>
          <p>Rating: {rating}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
