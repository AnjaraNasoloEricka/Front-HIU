import { BASE_URL, TOKEN } from "app/config";
import axios from "axios";

export const getExamList = async () => {
  const request = await axios.get(`${BASE_URL}/exam`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": TOKEN,
    },
  });
  return request.data;
};
export const getExamDetails = async (examId) => {
  const request = await axios.get(`${BASE_URL}/exam/${examId}`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": TOKEN,
    },
  });
  return request.data;
};
export const addExam = async (newExam) => {
  const data = {
    ...newExam,
  };
  const request = await axios.post(
    `${BASE_URL}/exam`,
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

export const updateExam = async (examId,newExam) => {
  const data = {
    ...newExam,
  };
  const request = await axios.put(
    `${BASE_URL}/exam/${examId}`,
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

export const deleteExam = async (examId) => {
  const request = await axios.delete(`${BASE_URL}/exam/${examId}`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": TOKEN,
    },
  });
  return request;
};

