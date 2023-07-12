<script setup>
import { useForm, useField } from 'vee-validate';
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginSchema as validationSchema } from '../validation/loginSchema';

const { handleSubmit } = useForm({ validationSchema });
const auth = useFirebaseAuth();

const email = useField('email');
const password = useField('password');

const submit = handleSubmit(async (values) => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password,
    );
    console.log(result);
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
});
</script>

<template>
  <VCard flat max-width="800" class="mx-auto my-10">
    <VCardTitle class="text-h4 font-weight-bold" tag="h3">
      Iniciar Sesión
    </VCardTitle>

    <VCardSubtitle class="text-h5">iniciar Sesión con tu cuenta</VCardSubtitle>

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
