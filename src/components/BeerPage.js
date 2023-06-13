import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Form, Modal} from 'react-bootstrap';
import {createBeer, deleteBeer, getAllBeers} from '../services/beerService';
import {getBeerStyles} from '../services/beerStyleService';

const BeersPage = () => {
    const [beers, setBeers] = useState([]);
    const [beerStyles, setBeerStyles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [beerForm, setBeerForm] = useState({
        name: '',
        beerStyleId: null,
        ibu: '',
        bottleCapacity: '',
        alcoholPercentage: '',
        color: '',
        description: '',
        price: '',
    });

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleInputChange = (event) => {
        setBeerForm({
            ...beerForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createBeer(beerForm);
        setBeers(await getAllBeers());
        handleClose();
    };

    useEffect(() => {
        const fetchData = async () => {
            const beersData = await getAllBeers();
            const beerStylesData = await getBeerStyles();

            setBeers(beersData);
            setBeerStyles(beerStylesData);
        };

        fetchData();
    }, []);

    const handleDeleteBeer = async (beer) => {
        await deleteBeer(beer.id);
        setBeers(await getAllBeers());
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Oferta piw</h1>

            <Button variant="primary" onClick={handleShow}>Dodaj piwo</Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj piwo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBeerName">
                            <Form.Label>Nazwa piwa</Form.Label>
                            <Form.Control type="text" placeholder="Nazwa piwa" name="name"
                                          onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBeerStyle">
                            <Form.Label>Styl piwa</Form.Label>
                            <Form.Control as="select" name="beerStyleId" onChange={handleInputChange}>
                                <option>Wybierz styl...</option>
                                {beerStyles.map(style => <option key={style.id} value={style.id}>{style.name}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBeerIbu">
                            <Form.Label>IBU</Form.Label>
                            <Form.Control type="number" placeholder="IBU" name="ibu" onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBeerBottleCapacity">
                            <Form.Label>Pojemność butelki</Form.Label>
                            <Form.Control type="number" placeholder="Pojemność butelki" name="bottleCapacity"
                                          onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBeerAlcoholPercentage">
                            <Form.Label>Procent alkoholu</Form.Label>
                            <Form.Control type="number" placeholder="Procent alkoholu" name="alcoholPercentage"
                                          onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBeerColor">
                            <Form.Label>Kolor</Form.Label>
                            <Form.Control type="text" placeholder="Kolor" name="color" onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBeerDescription">
                            <Form.Label>Opis</Form.Label>
                            <Form.Control type="text" placeholder="Opis" name="description"
                                          onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBeerPrice">
                            <Form.Label>Cena</Form.Label>
                            <Form.Control type="number" placeholder="Cena" name="price" onChange={handleInputChange}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">Dodaj</Button>
                    </Form>

                </Modal.Body>
            </Modal>

            {beers.map((beer) => (
                <Card key={beer.id} className="mb-4 shadow">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <div>{beer.name}</div>
                        <Button variant="danger" onClick={() => handleDeleteBeer(beer)}>Usuń</Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{beer.name}</Card.Title>
                        <Card.Text>
                            Styl piwa: {beer.beerStyleName} <br/>
                            IBU: {beer.ibu} <br/>
                            Pojemność butelki: {beer.bottleCapacity} <br/>
                            Procent alkoholu: {beer.alcoholPercentage}% <br/>
                            Kolor: {beer.color} <br/>
                            Opis: {beer.description} <br/>
                            Cena: {beer.price} zł <br/>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default BeersPage;
