import api from './api';

export const getManager = (managerId) => {
    return api.get(`/managers/${managerId}`);
};

export const updateManager = (managerId, data) => {
    return api.put(`/managers/${managerId}`, data);
};

export const getManagedBreweries = (managerId) => {
    return api.get(`/managers/${managerId}/managed-breweries`);
};

export const deleteAllManagedBreweries = (managerId) => {
    return api.delete(`/managers/${managerId}/managed-breweries`);
};

export const deleteSelectedManagedBrewery = (managerId, breweryId) => {
    return api.delete(`/managers/${managerId}/managed-breweries/${breweryId}`);
};
