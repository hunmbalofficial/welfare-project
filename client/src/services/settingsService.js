import API from './api';

export const getSetting = (key) => API.get(`/settings/${key}`);
export const getPublicSetting = (key) => API.get(`/settings/public/${key}`);
export const updateSetting = (key, value) => API.put(`/settings/${key}`, { value });
