import API from './api';

export const submitDonation = (data) => API.post('/donations', data);
export const getDonations = () => API.get('/donations');
export const deleteDonation = (id) => API.delete(`/donations/${id}`);
