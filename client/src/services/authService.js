import API from './api';

export const loginAdmin = (credentials) => API.post('/admin/login', credentials);
export const getAdminProfile = () => API.get('/admin/profile');
