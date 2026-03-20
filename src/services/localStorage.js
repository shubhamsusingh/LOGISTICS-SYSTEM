import {jwtDecode} from 'jwt-decode';
export const getToken = () => {
  return localStorage.getItem('sctoken');
};

export const setToken = (token) => {
  localStorage.setItem('sctoken', token);
};

export const getDecodedToken = () => {
  // Retrieve the JWT token from local storage
  const token = localStorage.getItem('sctoken');

  if (token) {
    try {
      // Decode the JWT token
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};
