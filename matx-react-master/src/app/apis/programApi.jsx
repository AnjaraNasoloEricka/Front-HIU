import { BASE_URL, TOKEN } from "app/config";
import axios from "axios";

export const getProgramList = async () => {
  const request = await axios.get(`${BASE_URL}/program`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": TOKEN,
    },
  });
  return request.data;
};
export const addProgram = async (newProgram) => {
  const data = {
    ...newProgram,
  };
  const request = await axios.post(
    `${BASE_URL}/program`,
    {
      ...data,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": TOKEN,
      },
    }
  );
  return request;
};

export const updateProgram = async (programId, newProgram) => {
  const data = {
    ...newProgram,
  };
  const request = await axios.put(
    `${BASE_URL}/program/${programId}`,
    {
      ...data,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": TOKEN,
      },
    }
  );
  return request;
};
export const deleteProgram = async (programId) => {
  const data = {
    
  };
  console.log(data);
  const request = await axios.delete(
    `${BASE_URL}/program`,
    {
      data: {
        idProgram: `${programId}`,
      },
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": TOKEN,
      },
    },
  );
  return request;
};
