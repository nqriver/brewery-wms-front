import api from "./api";


export const getAllBeers = async () => {
    try {
        const response = await api.get('/beers');
        return response.data;
    } catch (error) {
        console.error('Error fetching beers:', error);
        return [];
    }
};

export const getBeerStyles = async () => {
    try {
        const response = await api.get('/beer-styles');
        return response.data;
    } catch (error) {
        console.error('Error fetching beers:', error);
        return [];
    }
};

export const createBeer = async (beerData) => {
    try {
        const response = await api.post('/beers', beerData);
        return response.data;
    } catch (error) {
        console.error('Error creating beer:', error);
    }
};

export const deleteBeer = async (id) => {
    try {
        await api.delete(`beers/${id}`);
    } catch (error) {
        console.error('Error deleting beer:', error);
    }
};
