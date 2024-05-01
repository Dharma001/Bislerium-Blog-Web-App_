import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = "https://localhost:7189/admin/api/";

export const fetchWithAuth = async (method, url, data = null) => {
  let token = Cookies.get('token');
  while (!token) {
    await new Promise(resolve => setTimeout(resolve, 100));
    token = Cookies.get('token');
  }
  const headers = {
    "Authorization": `Bearer ${token}`,
  };

  if (method.toUpperCase() !== 'DELETE') {
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }
  }

  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      headers,
      data
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Request failed");
  }
};
