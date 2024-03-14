<script setup>

  import PrimaryButton from "@/components/PrimaryButton.vue";
  import {ref} from "vue";


  const lastname = ref('');
  const firstname = ref('');
  const email = ref('');
  const password = ref('');
  const showPassword = ref(true);

  const confirmPassword = ref('');
  const showconfirmPassword = ref(true);

  const typeAccount = ref('');
  const orientation = ref('');

  const options = [
      "ID", "IE", "IL"
  ];

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
        <q-input color="primary" v-model="lastname" label="Nom" :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </li>

      <li class="form-item">
        <q-input color="primary" v-model="firstname" label="Prénom" :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </li>

      <li class="form-item">
        <q-input color="primary" v-model="email" type="email" label="Adresse e-mail" :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </li>

      <li class="form-item">
        <q-input v-model="password"
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
        <q-input v-model="confirmPassword"
                 :type="showconfirmPassword ? 'password' : 'text'"
                 label="Confirmation du mot de passe"
                 :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="password" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showconfirmPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showconfirmPassword = !showconfirmPassword"
            />
          </template>
        </q-input>
      </li>

      <li class="form-item form-item-radio">
        <q-radio dense v-model="typeAccount" val="student" label="Étudiant" />
        <q-radio dense v-model="typeAccount" val="teacher" label="Enseignant" />
      </li>

      <li class="form-item">
        <q-select v-model="orientation" :options="options" label="Orientation" :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="school" />
          </template>
        </q-select>
      </li>

      <li class="form-item">
        <PrimaryButton text="Inscription" />
      </li>

      <li class="form-item">
        <p class="text-center">Déjà un compte !
          <router-link class="text-secondary text-bold" :to="{ name : 'login' }">Connectez-vous !</router-link>
        </p>
      </li>
    </ul>
  </q-form>
</template>

<style scoped lang="scss">

  .form-item-radio {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }

</style>