// ManagerPage.js
import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Container, Form, ListGroup, Modal, Row} from 'react-bootstrap';
import moment from 'moment'; // Importuj bibliotekę moment.js
import '../index.css';
import {
    deleteAllManagedBreweries,
    deleteSelectedManagedBrewery,
    getManagedBreweries,
    getManager,
    updateManager
} from '../services/loggedInManagerService';
import jwtDecode from "jwt-decode";

const ManagerPage = () => {
    const [manager, setManager] = useState(null);
    const [breweries, setBreweries] = useState([]);
    const [selectedBreweries, setSelectedBreweries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        name: '',
        login: '',
        email: '',
        phoneNumber: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const jwt = localStorage.getItem('jwt');
    const decodedJwt = jwt ? jwtDecode(jwt) : null;
    const managerId = decodedJwt ? decodedJwt.managerId : null;
    const [formErrors, setFormErrors] = useState({
        name: '',
        login: '',
        email: '',
        phoneNumber: ''
    });
    const [formAlert, setFormAlert] = useState('');

    useEffect(() => {
        async function fetchData() {
            const managerData = await getManager(managerId);
            const breweriesData = await getManagedBreweries(managerId);

            setManager(managerData.data);
            setBreweries(breweriesData.data);
        }

        fetchData();
    }, []);

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setSelectedBreweries([...selectedBreweries, id]);
        } else {
            setSelectedBreweries(selectedBreweries.filter(breweryId => breweryId !== id));
        }
    };

    const handleDeleteAll = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDeleteAll = async () => {
        try {
            await deleteAllManagedBreweries(managerId);
            setBreweries([]);
            setShowDeleteModal(false);
        } catch (error) {
            setErrorMessage(error);
        }
    };
    const handleDeleteSelected = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDeleteSelected = async () => {
        try {
            for (const id of selectedBreweries) {
                await deleteSelectedManagedBrewery(managerId, id);
            }
            setBreweries(breweries.filter(brewery => !selectedBreweries.includes(brewery.id)));
            setSelectedBreweries([]);
            setShowDeleteModal(false);
        } catch (error) {
            setErrorMessage(error);
        }
    };
    const handleEdit = () => {
        setShowModal(true);
        setUpdatedData({
            name: manager.name,
            login: manager.login,
            email: manager.email,
            phoneNumber: manager.phoneNumber
        });
    };

    const isFormValid = () => {
        // zwraca 'true' tylko wtedy, gdy wszystkie wartości formErrors są puste
        return !Object.values(formErrors).some(x => x !== '');
    };

    const handleSave = async () => {
        if (isFormValid()) {
            try {
                await updateManager(managerId, updatedData);
                const updatedManagerData = await getManager(managerId);
                setManager(updatedManagerData.data);
                setShowModal(false);
            } catch (error) {
                setErrorMessage(error);
            }
        } else {
            setFormAlert('Formularz jest nieprawidłowy, nie można zapisać danych');

            setTimeout(() => {
                setFormAlert('');
            }, 5000); // Alert zniknie po 5 sekundach
            console.log('Formularz jest nieprawidłowy, nie można zapisać danych');
        }
    };
    const handleClose = () => {
        setShowModal(false);
        setShowDeleteModal(false);
    };

    const validateField = (name, value) => {
        let errorMsg = '';

        switch (name) {
            case 'name':
                errorMsg = value.trim() ? '' : 'Pole imię jest wymagane';
                break;
            case 'login':
                errorMsg = value.trim() ? '' : 'Pole login jest wymagane';
                break;
            case 'email':
                errorMsg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Podaj prawidłowy email';
                break;
            case 'phoneNumber':
                errorMsg = /^[0-9]{9}$/.test(value) ? '' : 'Numer telefonu powinien mieć dokładnie 9 cyfr';
                break;
            default:
                break;
        }

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMsg
        }));
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        validateField(name, value);
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Zarządzaj swoim kontem</h1>

            <Row>
                {formAlert && (
                    <Alert variant="danger">
                        {formAlert}
                    </Alert>
                )}

                {errorMessage && (
                    <Alert variant="danger">
                        {errorMessage}
                    </Alert>
                )}

                {manager && (
                    <Card style={{marginBottom: '2rem', width: '100%'}}>
                        <Card.Header>
                            <Card.Title>Twoje dane osobowe</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{manager.name}</Card.Title>
                            <Card.Text>
                                Login: {manager.login} <br/>
                                Email: {manager.email} <br/>
                                Telefon: {manager.phoneNumber} <br/>
                                Data
                                zatrudnienia: {moment(manager.hireDate).format('DD.MM.YYYY')} {/* Formatowanie daty */}
                            </Card.Text>
                            <Button variant="primary" onClick={handleEdit}>
                                Edytuj dane
                            </Button>
                        </Card.Body>
                    </Card>
                )}

                <h4>Zakłady browarnicze, którymi zarządzasz</h4>

                <div className="d-flex justify-content-between mb-2">
                    <Button onClick={handleDeleteAll} disabled={breweries.length === 0}>
                        Usuń wszystkie uprawnienia
                    </Button>
                    <Button onClick={handleDeleteSelected}
                            disabled={breweries.length === 0 || selectedBreweries.length === 0}>
                        Usuń wybrane
                    </Button>
                </div>

                {breweries.length > 0 ? (
                    <ListGroup>
                        {breweries.map(brewery => (
                            <ListGroup.Item key={brewery.id}>
                                <Form.Check
                                    className="custom-checkbox"
                                    type="checkbox"
                                    onChange={e => handleCheckboxChange(e, brewery.id)}
                                    inline
                                />
                                {brewery.name}, {brewery.city}, {brewery.postalCode}, {brewery.surfaceArea}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <Alert variant="warning">
                        Nie masz uprawnień do zarządzania żadnym koncernem browarniczym
                    </Alert>
                )}

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edytuj dane</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Imię</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder={manager && manager.name}
                                    value={updatedData.name}
                                    onChange={handleInputChange}
                                />
                                {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                            </Form.Group>

                            <Form.Group controlId="formLogin">
                                <Form.Label>Login</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="login"
                                    placeholder={manager && manager.login}
                                    value={updatedData.login}
                                    onChange={handleInputChange}
                                />
                                {formErrors.login && <div className="error-message">{formErrors.login}</div>}
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder={manager && manager.email}
                                    value={updatedData.email}
                                    onChange={handleInputChange}
                                />
                                {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                            </Form.Group>

                            <Form.Group controlId="formPhone">
                                <Form.Label>Telefon</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder={manager && manager.phoneNumber}
                                    value={updatedData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                                {formErrors.phoneNumber &&
                                    <div className="error-message">{formErrors.phoneNumber}</div>}
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Anuluj
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Zapisz zmiany
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDeleteModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Potwierdzenie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Czy na pewno chcesz usunąć uprawnienia?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Anuluj
                        </Button>
                        <Button variant="primary" onClick={handleConfirmDeleteAll}>
                            Usuń wszystkie
                        </Button>
                        <Button variant="primary" onClick={handleConfirmDeleteSelected}>
                            Usuń wybrane
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        </Container>
    );
};

export default ManagerPage;
