import * as request from "./requester";

const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3030'
  : 'http://localhost:3030'; // TODO: Add server url when deployed

const url = `${baseUrl}/users`;

export const login = ({ email, password }) =>
  request.post(`${url}/login`, { email, password });


export const logout = async (accessToken) => {
  try {
    const response = await fetch(`${url}/logout`, {
      headers: {
        'X-Authorization': accessToken
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = ({ email, password }) =>
  request.post(`${url}/register`, { email, password });
