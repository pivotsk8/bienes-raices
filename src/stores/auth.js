import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useFirebaseAuth } from 'vuefire';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth();
  const authUser = ref(null);
  const router = useRouter();

  const errorMsg = ref('');
  const errorCodes = {
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'El password es incorrecto',
  };

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      user ? (authUser.value = user) : null;
    });
  });

  const login = async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      authUser.value = user;
      router.push({ name: 'admin-propiedades' });
    } catch (error) {
      errorMsg.value = errorCodes[error.code];
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      authUser.value = null;
      router.push({ name: 'login' });
    } catch (error) {}
  };

  const hasError = computed(() => errorMsg.value);
  const isAuth = computed(() => authUser.value);

  return {
    login,
    logout,
    hasError,
    errorMsg,
    isAuth,
  };
});
