// ./services/breweryService.js
import api from './api';
import {useState, useEffect} from 'react';

const useBreweries = () => {
    const [breweries, setBreweries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBreweries = async () => {
            setLoading(true);
            try {
                const response = await api.get('/breweries');
                setBreweries(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBreweries();
    }, []);

    return {breweries, loading, error};
};

const useBreweryDetails = () => {
    const [loading, setLoading] = useState(false);

    const getBreweryDetail = async (id) => {
        setLoading(true);
        try {
            const response = await api.get(`/breweries/${id}`);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    return {getBreweryDetail, loading};
};

const useBreweryProductionBatches = () => {
    const [loading, setLoading] = useState(false);

    const getBreweryProductionBatches = async (breweryId) => {
        setLoading(true);
        try {
            const response = await api.get(`/stock/breweries/${breweryId}/batches`);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    return {getBreweryProductionBatches, loading};
};
const addBeerToBrewery = async (breweryId, beerId) => {
    try {
        const response = await api.post(`/breweries/${breweryId}/beers/${beerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const editBrewery = async (breweryId, data) => {
    try {
        const response = await api.put(`/breweries/${breweryId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getBeers = async () => {
    try {
        const response = await api.get(`/beers`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const finishBeerProduction = async (breweryId, beerId) => {
    try {
        const response = await api.delete(`/breweries/${breweryId}/beers/${beerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    useBreweries,
    useBreweryDetails,
    useBreweryProductionBatches,
    addBeerToBrewery,
    editBrewery,
    getBeers,
    finishBeerProduction
};