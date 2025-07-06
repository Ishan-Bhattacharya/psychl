import { API_URL } from '../api.js';

export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}check_login/${username}&${password}`);
  if (!response.ok) throw new Error('Login failed');
  return response.json();
} 