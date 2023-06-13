import api from "./api";

export const getBeerStyles = async () => {
    try {
        const response = await api.get('/beer-styles');
        return response.data;
    } catch (error) {
        console.error('Error fetching beer styles:', error);
        return [];
    }
};

export const getBeersByStyleId = async (id) => {
    try {
        const response = await api.get(`/beer-styles/${id}/beers`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching beers for style id ${id}:`, error);
        return [];
    }
};
