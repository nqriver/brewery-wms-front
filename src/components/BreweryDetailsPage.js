import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBreweryDetails } from '../services/breweryService';
import { Spinner, Table, Alert } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const BreweryDetailsPage = () => {
    const [breweryDetail, setBreweryDetail] = useState(null);
    const [error, setError] = useState(null);
    const {getBreweryDetail, loading} = useBreweryDetails();
    const {breweryId} = useParams();

    useEffect(() => {
        const fetchBreweryDetail = async () => {
            try {
                const detail = await getBreweryDetail(breweryId);
                setBreweryDetail(detail);
            } catch (error) {
                setError(error);
            }
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

    if (error) {
        return (
            <Alert variant="danger">
                {error}
            </Alert>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Szczegóły Browaru</h1>
            {breweryDetail && (
                <div>
                    <h2>{breweryDetail.brewery.name}</h2>
                    <p><strong>Miasto:</strong> {breweryDetail.brewery.city}</p>
                    <p><strong>Kod pocztowy:</strong> {breweryDetail.brewery.postalCode}</p>
                    <p><strong>Powierzchnia:</strong> {breweryDetail.brewery.surfaceArea}</p>

                    <h5 className="mt-4">Produkowane piwa:</h5>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Styl</th>
                            <th>IBU</th>
                            <th>Pojemność butelki</th>
                            <th>Procent alkoholu</th>
                            <th>Kolor</th>
                            <th>Opis</th>
                            <th>Cena</th>
                        </tr>
                        </thead>
                        <tbody>
                        {breweryDetail.producedBeers.map((beer) => (
                            <tr key={beer.id}>
                                <td>{beer.name}</td>
                                <td>{beer.beerStyleName}</td>
                                <td>{beer.ibu}</td>
                                <td>{beer.bottleCapacity}</td>
                                <td>{beer.alcoholPercentage}</td>
                                <td>{beer.color}</td>
                                <td>{beer.description}</td>
                                <td>{beer.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}
export default BreweryDetailsPage;