import { BASE_URL, TOKEN } from 'app/config';
import axios from 'axios';

export const getProgramList = async () => {
  const request = await axios.get(`${BASE_URL}/program`, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': TOKEN,
    },
  });
  return request.data;
};

export const updateProgram = async (programId) => {};
export const deleteProgram = async (programId) => {};
export const addProgram = async () => {};
