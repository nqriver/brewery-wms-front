import React, {useEffect, useState} from 'react';
import {Alert, Button, Container, Modal, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useBreweryProductionBatches} from "../services/breweryService";
import {useParams} from "react-router-dom";
import {LoadingPage} from "./LoadingPage";

const BreweryProductionBatchPage = () => {
    const [productionBatches, setProductionBatches] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [currentBatchDetails, setCurrentBatchDetails] = useState({});
    const { getBreweryProductionBatches, loading } = useBreweryProductionBatches();
    const { breweryId } = useParams();
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchProductionBatches = async () => {
            try {
                const batches = await getBreweryProductionBatches(breweryId);
                setProductionBatches(batches);
            } catch (error) {
                setErrorMessage(error);
            }
        };

        fetchProductionBatches();
    }, [breweryId]);
    const handleDetailsClick = (batch) => {
        setCurrentBatchDetails(batch);
        setShowDetails(true);
    };

    const handleClose = () => setShowDetails(false);

    if (loading) {
        return <LoadingPage/>;
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Produkcja w Browarze</h1>
            {errorMessage && (
                <Alert variant="danger">
                    {errorMessage}
                </Alert>
            )}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nazwa piwa</th>
                    <th>Kod partii produkcyjnej</th>
                    <th>Data produkcji</th>
                    <th>Data ważności</th>
                    <th>Łączna liczba litrów</th>
                    <th>Szczegóły</th>
                </tr>
                </thead>
                <tbody>
                {productionBatches && productionBatches.map((batch) => (
                    <tr key={batch.id}>
                        <td>{batch.id}</td>
                        <td>{batch.beer.name}</td>
                        <td>{batch.productionBatchCode}</td>
                        <td>{batch.productionTimestamp}</td>
                        <td>{batch.expirationTimestamp}</td>
                        <td>{batch.totalLiters}</td>
                        <td><Button variant="info" onClick={() => handleDetailsClick(batch)}>Szczegóły</Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal show={showDetails} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Szczegóły partii</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Informacje o piwie:</h5>
                    <p>Nazwa piwa: {currentBatchDetails.beer?.name}</p>
                    <p>Styl piwa: {currentBatchDetails.beer?.style}</p>
                    <h5>Informacje o browarze:</h5>
                    <p>Nazwa browaru: {currentBatchDetails.brewery?.name}</p>
                    <p>Miasto: {currentBatchDetails.brewery?.city}</p>
                    <p>Kod wewnętrzny: {currentBatchDetails.brewery?.internalCode}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BreweryProductionBatchPage;
