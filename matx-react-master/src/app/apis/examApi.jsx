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
