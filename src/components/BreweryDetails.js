import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBreweryService } from '../services/breweryService';
import { Spinner } from 'react-bootstrap';
// import { Card, Accordion, ListGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

const BreweryDetails = () => {
    const [breweryDetail, setBreweryDetail] = useState(null);
    const { getBreweryDetail, loading } = useBreweryService();
    const [expandedIndex, setExpandedIndex] = useState(null);
    const { breweryId } = useParams();

    useEffect(() => {
        const fetchBreweryDetail = async () => {
            const detail = await getBreweryDetail(breweryId);
            setBreweryDetail(detail);
        };

        fetchBreweryDetail();
    }, [breweryId]);

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Ładowanie...</span>
            </Spinner>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Szczegóły Browaru</h1>
            {breweryDetail && (
                <Card>
                    <Card.Header>
                        <h2>{breweryDetail.name}</h2>
                        <p><strong>Miasto:</strong> {breweryDetail.city}</p>
                        <p><strong>Kod pocztowy:</strong> {breweryDetail.postalCode}</p>
                        <p><strong>Powierzchnia:</strong> {breweryDetail.surfaceArea}</p>
                    </Card.Header>
                    <Card.Body>
                        <h5>Produkowane piwa:</h5>
                        {breweryDetail.producedBeers.map((beer, index) => (
                            <div key={beer.id}>
                                <Button onClick={() => setExpandedIndex(index)} variant="link">
                                    {beer.name}
                                </Button>
                                {expandedIndex === index && (
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><strong>Styl:</strong> {beer.beerStyleName}</ListGroup.Item>
                                        <ListGroup.Item><strong>IBU:</strong> {beer.ibu}</ListGroup.Item>
                                        <ListGroup.Item><strong>Pojemność butelki:</strong> {beer.bottleCapacity}</ListGroup.Item>
                                        <ListGroup.Item><strong>Procent alkoholu:</strong> {beer.alcoholPercentage}</ListGroup.Item>
                                        <ListGroup.Item><strong>Kolor:</strong> {beer.color}</ListGroup.Item>
                                        <ListGroup.Item><strong>Opis:</strong> {beer.description}</ListGroup.Item>
                                        <ListGroup.Item><strong>Cena:</strong> {beer.price}</ListGroup.Item>
                                    </ListGroup>
                                )}
                            </div>
                        ))}
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default BreweryDetails;
