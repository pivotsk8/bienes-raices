<script setup>
import { RouterView } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();
const { isAuth } = storeToRefs(auth);
</script>

<template>
  <VCard elevation="3" max-width="1200" class="mx-auto">
    <VLayout>
      <v-app-bar color="blue-darken-1">
        <template v-slot:prepend>
          <VBtn :to="{ name: 'home' }">Bienes-Raices</VBtn>
        </template>

        <template v-slot:append>
          <div v-if="isAuth">
            <VBtn :to="{ name: 'admin-propiedades' }">Admin</VBtn>
            <VBtn @click="auth.logout">Cerrar Sesaión</VBtn>
          </div>
          <div v-else>
            <VBtn :to="{ name: 'home' }">Inicio</VBtn>
            <VBtn :to="{ name: 'login' }">Iniciar Sesaión</VBtn>
          </div>
        </template>
      </v-app-bar>

      <VMain>
        <VContainer>
          <RouterView />
        </VContainer>
      </VMain>
    </VLayout>
  </VCard>
</template>
