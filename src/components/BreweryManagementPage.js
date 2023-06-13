import React, {useState, useEffect} from 'react';
import {Button, Form, Alert, Table} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {
    useBreweryDetails,
    addBeerToBrewery,
    editBrewery,
    getBeers, finishBeerProduction
} from '../services/breweryService';
import '../styles/BreweryManagement.css'

const BreweryManagementPage = () => {
    const {id} = useParams();
    const {getBreweryDetail} = useBreweryDetails();
    const [brewery, setBrewery] = useState(null);
    const [beers, setBeers] = useState([]);
    const [selectedBeer, setSelectedBeer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedBrewery, setEditedBrewery] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const details = await getBreweryDetail(id);
                setBrewery(details);
                setEditedBrewery(details.brewery);
            } catch (e) {
                setError(e);
            }
        };

        const fetchBeers = async () => {
            try {
                const allBeers = await getBeers();
                setBeers(allBeers);
            } catch (e) {
                setError(e);
            }
        };

        fetchDetails();
        fetchBeers();
    }, [id]);

    const handleAddBeer = async () => {
        try {
            await addBeerToBrewery(id, selectedBeer);
            alert("Piwo zostało dodane do produkcji!");
            const updatedBrewery = await getBreweryDetail(id);
            setBrewery(updatedBrewery);
        } catch (e) {
            setError(e);
        }
    };

    const handleFinishBeerProduction = async (beerId) => {
        try {
            await finishBeerProduction(id, beerId);
            alert("Piwo zostało usunięte z produkcji!");
            const updatedBrewery = await getBreweryDetail(id);
            setBrewery(updatedBrewery);
        } catch (e) {
            setError(e.message);
        }
    };

    const handleSave = async () => {
        try {
            await editBrewery(id, editedBrewery);
            setEditMode(false);
            alert("Dane browaru zostały zaktualizowane!");
        } catch (e) {
            setError(e);
        }
    };

    if (error) {
        return <Alert variant='danger'>{error}</Alert>;
    }

    if (!brewery) {
        return <p>Loading...</p>;
    }

    return (
        <div className="brewery-management">
            <section className="brewery-info">
                {!editMode ? (
                    <>
                        <h2>{brewery.brewery.name}</h2>
                        <p><strong>Miasto:</strong> {brewery.brewery.city}</p>
                        <p><strong>Kod pocztowy:</strong> {brewery.brewery.postalCode}</p>
                        <p><strong>Powierzchnia:</strong> {brewery.brewery.surfaceArea}</p>
                        <Button onClick={() => setEditMode(true)}>Edytuj dane browaru</Button>
                    </>
                ) : (
                    <>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nazwa browaru</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editedBrewery.name}
                                    onChange={(e) =>
                                        setEditedBrewery({...editedBrewery, name: e.target.value})
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Miasto</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editedBrewery.city}
                                    onChange={(e) =>
                                        setEditedBrewery({...editedBrewery, city: e.target.value})
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Kod pocztowy</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editedBrewery.postalCode}
                                    onChange={(e) =>
                                        setEditedBrewery({...editedBrewery, postalCode: e.target.value})
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Powierzchnia</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={editedBrewery.surfaceArea}
                                    onChange={(e) =>
                                        setEditedBrewery({...editedBrewery, surfaceArea: +e.target.value})
                                    }
                                />
                            </Form.Group>
                        </Form>
                        <Button onClick={handleSave}>Zapisz</Button>
                    </>
                )}
            </section>
            <section className="brewery-beers">
                <h4>Dodaj piwo do produkcji:</h4>
                <Form.Control
                    as="select"
                    value={selectedBeer}
                    onChange={e => setSelectedBeer(e.target.value)}>
                    <option value="">-- Wybierz piwo --</option>
                    {beers.map(beer => (
                        <option key={beer.id} value={beer.id}>{beer.name}</option>
                    ))}
                </Form.Control>
                <Button onClick={handleAddBeer}>Dodaj piwo do produkcji</Button>

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
                    {brewery.producedBeers.map((beer) => (
                        <tr key={beer.id}>
                            <td>{beer.name}</td>
                            <td>{beer.beerStyleName}</td>
                            <td>{beer.ibu}</td>
                            <td>{beer.bottleCapacity}</td>
                            <td>{beer.alcoholPercentage}</td>
                            <td>{beer.color}</td>
                            <td>{beer.description}</td>
                            <td>{beer.price}</td>
                            <td>
                                <Button onClick={() => handleFinishBeerProduction(beer.id)}>
                                    Usuń z produkowanych piw
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </section>
        </div>
    );
};

export default BreweryManagementPage;
