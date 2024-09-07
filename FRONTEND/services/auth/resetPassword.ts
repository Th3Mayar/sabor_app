import { urlAPI } from "@/composables/api/url";

export const requestPasswordReset = async (email: string): Promise<void> => {
  const response = await fetch(`${urlAPI}/auth/request-reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`,
      "x-api-key": `${process.env.VUE_APP_API_KEY}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = (await response.json()).message || response.status;
    return Promise.reject(error);
  }
};
