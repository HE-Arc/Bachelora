<script setup>
  import { ref } from 'vue'
  import PrimaryButton from "@/components/PrimaryButton.vue";
  import BackendRequest from "@/request/request.js";
  import router from "@/router/index.js";
  import Cookie from "@/cookies/cookies.js";


  const username = ref('');
  const password = ref('');
  const showPassword = ref(true)

  const requiredField = (val) => {
    return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(!!val || 'Ce champ est requis')
          }, 1000)
        })
  };

  const onSubmit = async() => {
    const person = {
      username: username.value,
      password: password.value
    };

    const response = await BackendRequest.login(person);

    if(response === true)
    {
      Cookie.create();
      const token = Cookie.getToken();
      const user = Cookie.getUser();
      console.log(token);
      console.log(user);
      //router.push({name: 'bachelors'});
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
                 type="text"
                 autofocus
                 autocomplete="username"
                 v-model="username"
                 label="Nom d'utilisateur"
                 :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="person" />
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