import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function MovieDetail({ movieId }) {
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const apiKey = '8421123dac5fca84333b2383177d0527';
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`;
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
        setActors(data.credits.cast);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <Container>
      {movie && (
        <div>
          <h2>{movie.title}</h2>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>{movie.overview}</p>
          <p>Rating: {movie.vote_average}</p>
          <h3>Cast</h3>
          <Row>
            {actors.map(actor => (
              <Col key={actor.id} xs={6} md={3}>
                <div>
                  <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                  <p>{actor.name}</p>
                </div>
              </Col>
            ))}
          </Row>
          <Link to="/">
            <Button variant="success">Back to Search</Button>
          </Link>
        </div>
      )}
    </Container>
  );
}