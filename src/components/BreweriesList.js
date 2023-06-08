import React from 'react';
import { useBreweryService } from '../services/breweryService';
import { FaBuilding, FaCity, FaMailBulk, FaRulerCombined } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import the Link component
import 'bootstrap/dist/css/bootstrap.min.css';

const BreweriesList = () => {

    const { breweries, loading } = useBreweryService();

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">List of Breweries <FaBuilding /></h1>
            {breweries.map((brewery) => (
                <div key={brewery.id} className="card mb-3">
                    <div className="card-body">
                        <h2 className="card-title"><FaBuilding /> {brewery.name}</h2>
                        <p className="card-text">
                            <FaCity /> <strong>City: </strong>{brewery.city}
                        </p>
                        <p className="card-text">
                            <FaMailBulk /> <strong>Postal Code: </strong>{brewery.postalCode}
                        </p>
                        <p className="card-text">
                            <FaRulerCombined /> <strong>Surface Area: </strong>{brewery.surfaceArea}
                        </p>
                        <Link to={`/breweries/${brewery.id}`}>Szczegóły</Link> {/* Add the link */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BreweriesList;
