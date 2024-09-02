// services/auth/register.ts

import { urlAPI } from "@/composables/api/url";
import User from "@/types/User";

interface RegisterResponse {
  token: string;
  user: User;
}

export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
}): Promise<RegisterResponse> => {
  const response = await fetch(`${urlAPI}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`,
      "x-api-key": `${process.env.VUE_APP_API_KEY}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = (await response.json()).message || response.status;
    return Promise.reject(error);
  }

  const data: RegisterResponse = await response.json();
  return data;
};
