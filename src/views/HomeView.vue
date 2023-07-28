<script setup>
import usePropiedades from '@/composables/usePropiedades';
import Propiedad from '@/components/Propiedad.vue';
import { propertyPrice } from '../helpers';
const { propiedadesCollection } = usePropiedades();
</script>

<template>
  <h1 class="text-center">Nuestras Propiedades</h1>
  <VCard flat class="py-10">
    <VRow>
      <Propiedad
        v-for="propiedad in propiedadesCollection"
        :key="propiedad.id"
        :propiedad="propiedad"
        :price="propertyPrice" />
    </VRow>
  </VCard>
</template>
