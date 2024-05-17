import React from "react";
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom"; // Importar Link
import './MovieCard.scss';

export function MovieCard({ movie }) {
  return (
    <Col key={movie.id}>
      <Card className="movie-card">
        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img" />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.overview}</Card.Text>
          {movie.genres && (
            <Card.Text>Type: {movie.genres.map(genre => genre.name).join(', ')}</Card.Text>
          )}
          <Card.Text>Rating: {movie.vote_average}</Card.Text>
          <Link to={`/movie/${movie.id}`}>
            <Button variant="success">See details</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}