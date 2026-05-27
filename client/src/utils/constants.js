export const COLORS = {
  primary: '#16a34a',
  primaryDark: '#15803d',
  secondary: '#eab308',
  accent: '#3b82f6',
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_ORIGIN = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '').replace(/\/+$/, '')
  : 'http://localhost:5000';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Projects', path: '/projects' },
  { name: 'Donate', path: '/donate' },
  { name: 'Contact', path: '/contact' },
];

export const DONATION_METHODS = [
  { id: 'jazzcash', name: 'JazzCash', number: '0300-1234567' },
  { id: 'easypaisa', name: 'EasyPaisa', number: '0300-7654321' },
  { id: 'bank', name: 'Bank Transfer', details: 'Account: 1234-5678-9012' },
];
