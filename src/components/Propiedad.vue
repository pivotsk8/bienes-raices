<script setup>
defineProps({
  propiedad: {
    type: Object,
  },
  price: {
    type: Function,
  },
});
</script>

<template>
  <VCol cols="12" md="4">
    <VCard>
      <VImg :src="propiedad.imagen" heigth="250" cover />

      <VCardTitle>
        {{ propiedad.titulo }}
      </VCardTitle>

      <VCardText class="text-truncate">
        {{ propiedad.descripcion }}
      </VCardText>

      <VCardText class="text-h5 font-weight-bold">
        Precio: {{ price(propiedad.precio) }}
      </VCardText>

      <template v-slot:actions>
        <VBtn
          block
          color="info"
          variant="flat"
          :to="{ name: 'propiedad', params: { id: propiedad.id } }">
          Ver Informacion
        </VBtn>
      </template>
    </VCard>
  </VCol>
</template>
