// ./services/breweryService.js
import api from './api';
import { useState, useEffect } from 'react';

const useBreweryService = () => {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBreweries = async () => {
      setLoading(true);
      try {
        const response = await api.get('/breweries');
        setBreweries(response.data);
      } catch (error) {
        console.error('Error during fetching breweries', error);
        // Obsługa błędów
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  const getBreweryDetail = async (id) => {
    setLoading(true);
    let detail = null;
    try {
      const response = await api.get(`/breweries/${id}`);
      detail = response.data;
    } catch (error) {
      console.error(`Error during fetching brewery details: ${error}`);
      // Obsługa błędów
    } finally {
      setLoading(false);
    }
    return detail;
  };

  return { breweries, loading, getBreweryDetail };
};

export { useBreweryService };
