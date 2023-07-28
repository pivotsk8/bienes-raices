<script setup>
import usePropiedades from '@/composables/usePropiedades';
import { propertyPrice } from '@/helpers';
const { propiedadesCollection, deleteItem } = usePropiedades();
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weigth-bold">Admin Panel</h2>
  <VBtn color="blue" variant="flat" :to="{ name: 'nueva-propiedad' }">
    Nueva Propiedad
  </VBtn>

  <VCard class="mx-auto mt-10">
    <VList>
      <VListItem v-for="propiedad in propiedadesCollection" :key="propiedad.id">
        <template v-slot:prepend>
          <VListItemMedia :start="true">
            <img width="180" :src="propiedad.imagen" />
          </VListItemMedia>
        </template>

        <VListItemTitle>{{ propiedad.titulo }}</VListItemTitle>
        <VListItemSubtitle>
          {{ propertyPrice(propiedad.precio) }}
        </VListItemSubtitle>

        <template v-slot:append>
          <VBtn
            color="info"
            flat
            class="mr-2"
            :to="{ name: 'editar-propiedad', params: { id: propiedad.id } }">
            Editar
          </VBtn>
          <VBtn color="red-darken-3" flat @click="deleteItem(propiedad.id)">
            Eliminar
          </VBtn>
        </template>
      </VListItem>
    </VList>
  </VCard>
</template>
