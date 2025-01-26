import axios from 'axios';
import { AgendaItem } from '../types';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3003/api',
});

// Log the VITE_API_URL to verify it's being set correctly
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

// Function to fetch agenda items
export const fetchAgendaItems = async (): Promise<AgendaItem[]> => {
  try {
    const { data } = await api.get<AgendaItem[]>('/agenda');
    return data;
  } catch (error) {
    console.error('Error fetching agenda items:', error);
    throw new Error('Error loading agenda items. Please try again later.');
  }
};