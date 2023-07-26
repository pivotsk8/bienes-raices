<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { collection, addDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { useRouter } from 'vue-router';
import { validationSchema, imageSchema } from '@/validation/propiedadSchema';
import useImage from '@/composables/useImage';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';

const zoom = ref(15);
const items = [0, 1, 2, 3, 4, 5];

const router = useRouter();

const { url, uploadImage, image } = useImage();
//va a buscar las credenciales que tenemos
const db = useFirestore();

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
});

const titulo = useField('titulo');
const imagen = useField('imagen');
const precio = useField('precio');
const habitaciones = useField('habitaciones');
const wc = useField('wc');
const estacionamiento = useField('estacionamiento');
const piscina = useField('piscina', null, { initialValue: false });
const descripcion = useField('descripcion');

const submit = handleSubmit(async (values) => {
  const { imagen, ...propiedad } = values;

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, 'propiedades'), {
    ...propiedad,
    imagen: url.value,
  });

  if (docRef.id) {
    router.push({ name: 'admin-propiedades' });
  }
});
</script>

<template>
  <VCard max-width="800" flat class="mx-auto my-10">
    <VCardTitle class="text-h4 font-weight-bold" tag="h3">
      Iniciar Sesión
    </VCardTitle>

    <VCardSubtitle class="text-h5 py-5">
      Crear una nueva propiedad llenado el siguiente formulario
    </VCardSubtitle>

    <VForm class="mt-10">
      <VTextField
        class="mb-5"
        label="Titulo Propiedad"
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value" />

      <VFileInput
        accept="image/jpeg"
        label="Fotografia"
        prepend-icon="mdi-camera"
        class="mb-5"
        @change="uploadImage"
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value" />

      <div v-if="image" class="my-5">
        <p class="font-weight-bold">Imagen Propiedad:</p>
        <img :src="image" alt="imagen" class="w-50" />
      </div>

      <VTextField
        class="mb-5"
        label="Precio"
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value" />
      <VRow>
        <VCol cols="12" md="4">
          <VSelect
            class="mb-5"
            label="habitaciones"
            :items="items"
            v-model="habitaciones.value.value"
            :error-messages="habitaciones.errorMessage.value" />
        </VCol>

        <VCol cols="12" md="4">
          <VSelect
            class="mb-5"
            label="WC"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value" />
        </VCol>

        <VCol cols="12" md="4">
          <VSelect
            class="mb-5"
            label="Parqueaderos"
            :items="items"
            v-model="estacionamiento.value.value"
            :error-messages="estacionamiento.errorMessage.value" />
        </VCol>
      </VRow>

      <VTextarea
        class="mb-5"
        label="Descripción"
        v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value"></VTextarea>
      <VCheckbox label="Piscina" v-model="piscina.value.value"></VCheckbox>

      <div style="height: 600px; width: 800px">
        <l-map
          ref="map"
          v-model:zoom="zoom"
          :center="[47.41322, -1.219482]"
          :use-global-leaflet="false">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"></l-tile-layer>
        </l-map>
      </div>

      <VBtn color="pink-accent-3" block @click="submit">Agregar Propiedad</VBtn>
    </VForm>
  </VCard>
</template>
