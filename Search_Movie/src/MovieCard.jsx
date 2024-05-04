import React from "react";
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function MovieCard({ movie }) {
    return (
        <Col key={movie.id} style={{ transition: 'opacity 0.3s' }}>
            <Card style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', opacity: 1 }}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{ maxHeight: '400px', objectFit: 'cover' }} />
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <Card.Title style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxHeight: '50px' }}>{movie.title}</Card.Title>
                    <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '100px' }}>{movie.overview}</Card.Text>
                    { movie.genres && (
                        <Card.Text>Type: {movie.genres.map(genre => genre.name).join(', ')}</Card.Text>
                    )}
                    <Card.Text>Rating: {movie.vote_average}</Card.Text>
                    <Link to={`/movie/${movie.id}`}>
                        <Button variant="success" style={{ alignSelf: 'flex-end' }}>See details</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
}