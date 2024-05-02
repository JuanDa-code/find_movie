import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import curtainImage from '../public/images/Curtain.png';

export function MovieCard({ searchTerm }) {
    const [ movies, setMovies ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ filter, setFilter ] = useState('popular');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = '8421123dac5fca84333b2383177d0527';
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${currentPage}`;

                if (filter !== 'search') {
                    url = `https://api.themoviedb.org/3/movie/${filter}?api_key=${apiKey}&page=${currentPage}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                setMovies( data.results );
                setTotalPages( data.total_pages )
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMovies();
    }, [ filter, currentPage, searchTerm ]);

    const handleFilderChange = (newFilter) => {
        setMovies([]);
        setTimeout(() => {
            setFilter(newFilter);
            setCurrentPage(1);
        }, 300);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        setFilter('search');
    }

    const loadPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div style={{ backgroundImage: `url(${curtainImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <Container style={{ paddingTop: '20px', paddingBottom: '20px', }}>
                <div style={{ marginBottom: '20px', color: 'white' }}>
                    <Button onClick={ () => handleFilderChange('popular') } variant={ filter === 'popular' ? 'success' : 'outline-succss' } style={{ marginRight: '10px' }}>Popular Movies</Button>
                    <Button onClick={ () => handleFilderChange('top_rated') } variant={ filter === 'top_rated' ? 'success' : 'outline-succss' } style={{ marginRight: '10px' }}>Top Rated</Button>
                    <Button onClick={ () => handleFilderChange('upcoming') } variant={ filter === 'upcoming' ? 'success' : 'outline-succss' } style={{ marginRight: '10px' }}>Upcoming</Button>
                    <Button onClick={ () => handleFilderChange('now_playing') } variant={ filter === 'now_playing' ? 'success' : 'outline-succss' } style={{ marginRight: '10px' }}>Now Playing</Button>
                </div>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    { movies.map((movie) => (
                        <Col key={ movie.id } style={{ transition: 'opacity 0.3s' }}>
                            <Card style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', opacity: movies.length === 0 ? 0 : 1 }}>
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{ maxHeight: '400px', objectFit: 'cover' }} />
                                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                    <Card.Title style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxHeight: '50px' }}>{movie.title}</Card.Title>
                                    <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '100px' }}>{movie.overview}</Card.Text>
                                    { movie.genres && (
                                        <Card.Text>Type: {movie.genres.map(genre => genre.name).join(', ')}</Card.Text>
                                    )}
                                    <Card.Text>Rating: {movie.vote_average}</Card.Text>
                                    <Button variant="success" style={{ alignSelf: 'flex-end' }}>See details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )) }
                </Row>
                { totalPages > 0 && (
                    <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px', color: 'white' }}>
                        <Button onClick={() => loadPage(currentPage - 1)} variant='outline-success' style={{ marginRight: '5px' }} >&lt;&lt;</Button>
                        { Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                            <Button key={ i + 1 } onClick={() => loadPage(currentPage - 2 + i + 1)} variant={ currentPage === currentPage - 2 + i + 1 ? 'success' : 'outline-success'} style={{ marginRight: '5px' }} >{currentPage - 2 + i + 1}</Button>
                        ))}
                        { totalPages > 5 && <span>... </span> }
                        <Button onClick={() => loadPage(currentPage + 1)} variant='outline-success' style={{ marginRight: '5px' }}>&gt;&gt;</Button>
                    </div>
                ) }
            </Container>
        </div>
    )
}