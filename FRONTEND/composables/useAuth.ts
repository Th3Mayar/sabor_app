import { ref, onMounted } from 'vue';

export const useAuth = () => {
  const isAuthenticated = ref(false);

  onMounted(() => {
    const token = sessionStorage.getItem('authToken');
    isAuthenticated.value = !!token;
  });

  return { isAuthenticated };
};
