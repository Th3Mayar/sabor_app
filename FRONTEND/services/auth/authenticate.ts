// services/auth/authenticate.ts

import { urlAPI } from "@/composables/api/url";
import User from "@/types/User";

interface AuthResponse {
  token: string;
  user: User;
}

export const authenticate = async (user: User): Promise<AuthResponse> => {
  console.log("user: ", user);

  const response = await fetch(`${urlAPI}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.VUE_APP_API_KEY}`,
      "x-api-key": `${process.env.VUE_APP_API_KEY}`,
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });

  if (!response.ok) {
    const error = (await response.json()).message || response.status;
    return Promise.reject(error);
  }

  const data: AuthResponse = await response.json();
  const token = data.token;

  sessionStorage.setItem("authToken", token);

  return data;
};
