import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import {GiBeerBottle} from 'react-icons/gi';
import {FaUser} from 'react-icons/fa';
import {FiLogOut} from "react-icons/fi";

const NavBar = () => {
    let username = "";
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
        const decodedJwt = jwtDecode(jwt);
        username = decodedJwt.upn;
    }

    return (
        <Navbar bg="dark" expand="lg" variant="dark"> {/* Add fixed="top" */}
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <GiBeerBottle/> Browar Koniczynka
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-center" style={{flex: 1}}>
                        <Nav.Link as={Link} to="/breweries">Browary</Nav.Link>
                        <Nav.Link as={Link} to="/beers">Piwa</Nav.Link>
                        <Nav.Link as={Link} to="/beer-styles">Style piwne</Nav.Link>
                        <Nav.Link as={Link} to="/users">Użytkownik</Nav.Link>
                    </Nav>
                    <Navbar.Text className="justify-content-end">
                        Witaj {username} <FaUser/>
                    </Navbar.Text>
                    {jwt && (
                        <Navbar.Text className="justify-content-end">
                            <Nav.Link as={Link} to="/logout">Wyloguj się
                                <FiLogOut/>
                            </Nav.Link>
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
