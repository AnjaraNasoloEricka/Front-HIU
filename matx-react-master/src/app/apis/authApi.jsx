import { BASE_URL } from "app/config";
import axios from "axios";

export const loginApi = async ({ email, password }) => {
  const request = await axios.post(
    `${BASE_URL}/etudiant/login`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return request;
};
