import API from './api';

export const getTestimonials = () => API.get('/testimonials');
export const createTestimonial = (data) => API.post('/testimonials', data);
export const updateTestimonial = (id, data) => API.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => API.delete(`/testimonials/${id}`);
