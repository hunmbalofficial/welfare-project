import API from './api';

export const getProjects = () => API.get('/projects');
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateProject = (id, data) => API.put(`/projects/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteProject = (id) => API.delete(`/projects/${id}`);
