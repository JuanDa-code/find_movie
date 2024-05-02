import { Navbar, Form, FormControl, Button } from "react-bootstrap"

export function Bar({ setSearchTerm }) {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="text-light justify-content-center" style={{ fontSize: '20px' }}>
            <Navbar.Brand href="#home" style={{ fontSize: '30px' }}>
                <img src="/images/Logo.png" alt="Logo" />
                Search Movie
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline="true" className="mx-auto">
                    <FormControl type="text" id="search" placeholder="Search Movie" className="mr-sm-2" />
                    <Button variant="outline-success" style={{ marginTop: '5px' }} onClick={() => setSearchTerm(document.getElementById("search").value)}>Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}