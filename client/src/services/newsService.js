import API from './api';

export const getNews = () => API.get('/news');
export const getNewsItem = (id) => API.get(`/news/${id}`);
export const createNews = (data) => API.post('/news', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateNews = (id, data) => API.put(`/news/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteNews = (id) => API.delete(`/news/${id}`);
