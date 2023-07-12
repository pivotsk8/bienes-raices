<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <VCard elevation="3" max-width="1200" class="mx-auto">
    <VLayout>
      <v-app-bar color="blue-darken-1">
        <template v-slot:prepend>
          <VBtn :to="{ name: 'home' }">Bienes-Raices</VBtn>
        </template>
        <template v-slot:append>
          <VBtn :to="{ name: 'home' }">Inicio</VBtn>
          <VBtn :to="{ name: 'login' }">Iniciar Sesaión</VBtn>
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
