import { defineStore } from "pinia";
import { ref } from "vue";
import { authenticate } from "@/services/auth/authenticate";
import { registerUser } from "@/services/auth/register";
import User from "@/types/User";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      isLoading.value = true;
      const data = await authenticate(credentials);
      token.value = data.token;
      user.value = data.user;
      isAuthenticated.value = true;

      sessionStorage.setItem("authToken", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      logout();
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (userData: {
    full_name: string;
    contact_phone: string;
    email: string;
    password: string;
    role_id: number;
  }) => {
    try {
      isLoading.value = true;
      const data = await registerUser(userData);
      token.value = data.token;
      user.value = data.user;
      isAuthenticated.value = true;

      sessionStorage.setItem("authToken", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      logout();
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    token.value = null;
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
  };

  const checkAuth = () => {
    const storedToken = sessionStorage.getItem("authToken");
    const storedUser = sessionStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        token.value = storedToken;
        if (storedUser !== "undefined") {
          user.value = JSON.parse(storedUser);
          isAuthenticated.value = true;
        } else {
          throw new Error("Stored user data is undefined or invalid");
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        logout();
      }
    } else {
      logout();
    }
  };

  return {
    isAuthenticated,
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  };
});
