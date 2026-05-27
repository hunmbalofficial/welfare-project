import API from './api';

export const getGallery = () => API.get('/gallery');
export const uploadImage = (data) => API.post('/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteImage = (id) => API.delete(`/gallery/${id}`);
