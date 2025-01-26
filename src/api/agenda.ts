import axios from 'axios';
import { AgendaItem } from '../types';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3003',
});

// Log the VITE_API_URL to verify it's being set correctly
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

// Function to fetch agenda items
export const fetchAgendaItems = async (): Promise<AgendaItem[]> => {
  try {
    // Log the full URL being used for the request
    console.log('Fetching from:', api.defaults.baseURL + '/extracted_data.json');

    // Make the GET request to fetch the data
    const { data } = await api.get<AgendaItem[]>('/extracted_data.json');
    return data;
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching agenda items:', error);
    throw new Error('Error loading agenda items. Please try again later.');
  }
};