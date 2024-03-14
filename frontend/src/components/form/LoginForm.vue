<script setup>
  import { ref } from 'vue'
  import PrimaryButton from "@/components/PrimaryButton.vue";

  const email = ref('');
  const password = ref('');
  const showPassword = ref(true)
</script>

<template>
  <ul>
    <li>
      <q-input color="primary" v-model="email" label="Adresse e-mail">
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>
    </li>

    <li>
      <q-input v-model="password" :type="showPassword ? 'password' : 'text'" label="Mot de passe">
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

    <li>
      <PrimaryButton text="Connexion" />
    </li>

    <li>
      <p class="text-center">Pas de compte ?
        <router-link class="text-secondary text-bold" :to="{ name : 'register' }">Inscrivez-vous !</router-link>
      </p>
    </li>
  </ul>
</template>

<style scoped lang="scss">

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    li {
      padding: 1rem;
      max-width: 100%;
      min-width: 100%;
    }
  }
</style>