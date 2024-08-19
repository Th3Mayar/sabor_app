// autenticate user with email and password and return user data and token on http://localhost:4001/api/login

import { urlAPI } from "@/composables/api/url";
import User from "@/types/User";

export const autenticate = async (user: User) => {
  console.log("user: ", user);

  const email = user.email;
  const password = user.password;

  const response = await fetch(`${urlAPI}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.VUE_APP_API_KEY}`,
      "x-api-key": `${process.env.VUE_APP_API_KEY}`,
    },
     body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (!response.ok) {
    const error = (await response.json()).message || response.status;
    return Promise.reject(error);
  }
  return response.json();
};