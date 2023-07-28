<script setup>
import usePropiedades from '@/composables/usePropiedades';
import Propiedad from '@/components/Propiedad.vue';
import { propertyPrice } from '../helpers';
const { piscina, propiedadesFiltradas } = usePropiedades();
</script>

<template>
  <h1 class="text-center">Nuestras Propiedades</h1>
  <VCard flat class="py-10">
    <VCardTitle>
      Busquéda
      <VCheckbox label="Pisicina" v-model="piscina" />
    </VCardTitle>

    <VRow>
      <Propiedad
        v-for="propiedad in propiedadesFiltradas"
        :key="propiedad.id"
        :propiedad="propiedad"
        :price="propertyPrice" />
    </VRow>
  </VCard>
</template>
