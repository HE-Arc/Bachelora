<script setup>
  import { ref } from 'vue'
  import PrimaryButton from "@/components/PrimaryButton.vue";

  const email = ref('');
  const password = ref('');
  const showPassword = ref(true)

  const requiredField = (val) => {
    return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(!!val || 'Ce champ est requis')
          }, 1000)
        })
  };

  const success = ref(false);
  const onSubmit = async() => {
      try {
        success.value = false;

        // TODO call route
        //success.value = true;
      } catch (e) {
        console.log(e);
      }
  }
</script>

<template>
  <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
    <ul class="form">
      <li class="form-item">
        <q-input color="primary"
                 autofocus
                 autocomplete="mail"
                 v-model="email"
                 label="Adresse e-mail"
                 :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </li>

      <li class="form-item">
        <q-input v-model="password"
                 autocomplete="current-password"
                 :type="showPassword ? 'password' : 'text'"
                 label="Mot de passe"
                 :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="password" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </li>

      <li class="form-item">
        <PrimaryButton text="Connexion" type="submit"/>
      </li>

      <li class="form-item">
        <p class="text-center">Pas de compte ?
          <router-link class="text-secondary text-bold" :to="{ name : 'register' }">Inscrivez-vous !</router-link>
        </p>
      </li>
    </ul>
  </q-form>
</template>

<style scoped lang="scss">

</style>