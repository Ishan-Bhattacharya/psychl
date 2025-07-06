import { API_URL } from '../api.js';

export async function registerPatient(data) {
  const response = await fetch(`${API_URL}login/patient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to register patient');
  return response.json();
} 