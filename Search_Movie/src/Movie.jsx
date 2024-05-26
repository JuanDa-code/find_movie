import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Navbar, Form, FormControl, Nav } from 'react-bootstrap';
import { MovieCard } from './MovieCard';
import './Movie.scss';

export function MovieCardComponent({ searchTerm, setSearchTerm }) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('popular');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '8421123dac5fca84333b2383177d0527';
        let url = '';

        if (filter === 'search') {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${currentPage}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/${filter}?api_key=${apiKey}&page=${currentPage}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, [filter, currentPage, searchTerm]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter('search');
    setCurrentPage(1);
  };

  const loadPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <React.Fragment>
      <Navbar bg="dark" expand="lg" variant="dark" className="text-light justify-content-center navbar">
        <Navbar.Brand href="#home">
          <img src="/images/Logo.png" alt="Logo" />
          Search Movie
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/contact">Contáctanos</Nav.Link>
          </Nav>
          <Form inline="true" onSubmit={handleSearch} className="mx-auto form-inline">
            <FormControl type="text" id="search" placeholder="Search Movie" className="mr-sm-2 form-control" onChange={(e) => setSearchTerm(e.target.value)} />
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <div className="background">
        <Container className="container">
          <div className="filter-buttons">
            <Button onClick={() => handleFilterChange('popular')} variant={filter === 'popular' ? 'success' : 'outline-success'}>Popular Movies</Button>
            <Button onClick={() => handleFilterChange('top_rated')} variant={filter === 'top_rated' ? 'success' : 'outline-success'}>Top Rated</Button>
            <Button onClick={() => handleFilterChange('upcoming')} variant={filter === 'upcoming' ? 'success' : 'outline-success'}>Upcoming</Button>
            <Button onClick={() => handleFilterChange('now_playing')} variant={filter === 'now_playing' ? 'success' : 'outline-success'}>Now Playing</Button>
          </div>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Row>
          {totalPages > 0 && (
            <div className="pagination">
              <Button onClick={() => loadPage(Math.max(currentPage - 1, 1))} variant='outline-success'>&lt;&lt;</Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                <Button key={i + 1} onClick={() => loadPage(currentPage - 1 + i + 1)} variant={currentPage === currentPage - 1 + i + 1 ? 'success' : 'outline-success'}>{currentPage - 1 + i + 1}</Button>
              ))}
              {totalPages > 5 && <span>... </span>}
              <Button onClick={() => loadPage(currentPage + 1)} variant='outline-success'>&gt;&gt;</Button>
            </div>
          )}
        </Container>
      </div>
      <footer>
        &copy; {new Date().getFullYear()} Juan David Oviedo Bermeo | Creado por: JuanDa-code
      </footer>
    </React.Fragment>
  );
}