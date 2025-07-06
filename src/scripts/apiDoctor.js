import { API_URL } from '../api.js';

export async function registerDoctor(data) {
  const response = await fetch(`${API_URL}login/doctor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to register doctor');
  return response.json();
} 