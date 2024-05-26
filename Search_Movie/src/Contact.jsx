import React, { useState } from 'react';
import { Button, Container, Navbar, Form, Nav, Modal } from 'react-bootstrap';
import './Contact.scss';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setName('');
    setEmail('');
    setMessage('');
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
            </Navbar.Collapse>
        </Navbar>

        <div className="background">
            <Container className="contact-container">
                <h2>Contáctanos</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingresa tu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formMessage">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
                    </Form.Group>
                    <Button variant="success" type="submit">
                    Enviar
                    </Button>
                </Form>
        

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Mensaje Enviado</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tu mensaje ha sido enviado exitosamente. Gracias por comunicarte con nosotros.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Aceptar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    </React.Fragment>
  );
}