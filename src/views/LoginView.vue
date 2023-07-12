<script setup>
import { useForm, useField } from 'vee-validate';
import { loginSchema as validationSchema } from '../validation/loginSchema';
import { useAuthStore } from '../stores/auth';

const { handleSubmit } = useForm({ validationSchema });
const auth = useAuthStore();

const email = useField('email');
const password = useField('password');

const submit = handleSubmit((values) => {
  auth.login(values);
});
</script>

<template>
  <VCard flat max-width="800" class="mx-auto my-10">
    <VCardTitle class="text-h4 font-weight-bold" tag="h3">
      Iniciar Sesión
    </VCardTitle>

    <VCardSubtitle class="text-h5">iniciar Sesión con tu cuenta</VCardSubtitle>

    <VAlert
      v-if="auth.hasError"
      type="error"
      :title="auth.errorMsg"
      class="my-5" />

    <VForm class="mt-5">
      <VTextField
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value" />

      <VTextField
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value" />

      <VBtn block color="pink-accent-3" @click="submit">Iniciar Sesión</VBtn>
    </VForm>
  </VCard>
</template>
