import React, {useEffect, useState} from "react";
import {Button, Card, Container, ListGroup, Modal} from "react-bootstrap";
import {getBeersByStyleId, getBeerStyles} from "../services/beerStyleService";

const BeerStylesPage = () => {
    const [beerStyles, setBeerStyles] = useState([]);
    const [selectedBeerStyle, setSelectedBeerStyle] = useState(null);
    const [beers, setBeers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchBeerStyles = async () => {
            const data = await getBeerStyles();
            setBeerStyles(data);
        };

        fetchBeerStyles();
    }, []);

    const handleButtonClick = async (beerStyle) => {
        setSelectedBeerStyle(beerStyle);
        const data = await getBeersByStyleId(beerStyle.id);
        setBeers(data);
        handleShow();
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Style piwa</h1>

            {beerStyles.map((beerStyle) => (
                <Card key={beerStyle.id} className="mb-4 shadow">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <div>{beerStyle.name}</div>
                        <Button variant="primary" onClick={() => handleButtonClick(beerStyle)}>
                            Pokaż piwa tego stylu
                        </Button>
                    </Card.Header>
                </Card>
            ))}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>W naszym browarze produkujemy takie piwa stylu {selectedBeerStyle?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {beers.map((beer) => (
                            <ListGroup.Item key={beer.id}>{beer.name}</ListGroup.Item>
                        ))}
                    </ListGroup>
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

export default BeerStylesPage;
