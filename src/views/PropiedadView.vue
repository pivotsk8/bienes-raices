<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { doc } from 'firebase/firestore';
import { useDocument, useFirestore } from 'vuefire';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import useLocationMap from '@/composables/useLocationMap';
import { propertyPrice } from '../helpers';

const { zoom, center } = useLocationMap();
const {
  params: { id },
} = useRoute();
const db = useFirestore();
const docRef = doc(db, 'propiedades', id);
const propiedad = useDocument(docRef);
watch(propiedad, (propiedad) => {
  center.value = propiedad.ubicacion;
});
</script>

<template>
  <VCard flat>
    <VCardTitle class="mt-5 text-h3 text-center py-5 font-weigth-bold">
      {{ propiedad?.titulo }}
    </VCardTitle>

    <VImg :src="propiedad?.imagen" heigth="550" cover />

    <div
      class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row aling-center">
      <VCardText>
        Precio:
        <span class="font-weight-bold">
          {{ propertyPrice(propiedad?.precio) }}
        </span>
      </VCardText>
      <VCardText>
        Estacionamiento:
        <span class="font-weight-bold">{{ propiedad?.estacionamiento }}</span>
      </VCardText>
      <VCardText>
        Baños:
        <span class="font-weight-bold">{{ propiedad?.wc }}</span>
      </VCardText>
      <VCardText>
        Habitaciones:
        <span class="font-weight-bold">{{ propiedad?.habitaciones }}</span>
      </VCardText>
    </div>

    <VRow>
      <VCol cols="12" md="8">
        <div class="text-pre-wrap py-10">
          {{ propiedad?.descripcion }}
        </div>
      </VCol>

      <VCol cols="12" md="4">
        <div class="py-10" style="height: 600px">
          <LMap
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false">
            <LMarker :lat-lng="center">
              <LPopup>
                {{ propiedad.titulo }}
              </LPopup>
            </LMarker>

            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
        </div>
      </VCol>
    </VRow>
  </VCard>
</template>

<style>
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>
