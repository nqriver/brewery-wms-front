import React from 'react';
import {FaBuilding, FaCity, FaMailBulk, FaRulerCombined} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import {Spinner, Container, Card, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useBreweries} from "../services/breweryService";

const BreweriesListPage = () => {
    const {breweries, loading} = useBreweries();

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Zakłady browarnicze</h1>
            {breweries.map((brewery) => (
                <Card key={brewery.id} className="mb-3">
                    <Card.Body>
                        <Card.Title><FaBuilding/> {brewery.name}</Card.Title>
                        <Card.Text>
                            <FaCity/> <strong>Miasto: </strong>{brewery.city}
                        </Card.Text>
                        <Card.Text>
                            <FaMailBulk/> <strong>Kod pocztowy: </strong>{brewery.postalCode}
                        </Card.Text>
                        <Card.Text>
                            <FaRulerCombined/> <strong>Powierzchnia: </strong>{brewery.surfaceArea}
                        </Card.Text>
                        <LinkContainer to={`/breweries/${brewery.id}`}>
                            <Button variant="info">Szczegóły</Button>
                        </LinkContainer>
                        <LinkContainer to={`/breweries/${brewery.id}/production-batches`}>
                            <Button variant="dark" className="ml-2">Monitoruj produkcję</Button>
                        </LinkContainer>
                        <LinkContainer to={`/breweries/${brewery.id}/management`}>
                            <Button variant="success" className="ml-2">Zarządzaj</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default BreweriesListPage;
