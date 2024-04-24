<script setup>

  import PrimaryButton from "@/components/PrimaryButton.vue";
  import {nextTick, onMounted, ref} from "vue";
  import BackendRequest from "@/request/request.js";
  import router from "@/router/index.js";

  const username = ref('');
  const lastname = ref('');
  const firstname = ref('');
  const email = ref('');
  const password = ref('');
  const showPassword = ref(true);

  const confirmPassword = ref('');
  const showconfirmPassword = ref(true);

  const userType = ref('');
  const orientation = ref('');

  const requiredField = (val) => {
    return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(!!val || 'Ce champ est requis')
          }, 1000)
        });
  };

  const passwordMatches = (val) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(val === password.value || 'Mots de passes différents')
      }, 2000)
    });
  }


const orientationItems = ref([]);
const fetchOrientationItems = async () => {
  const res = await BackendRequest.fetchAllOrientations();
  orientationItems.value = res.data;
};

  const onSubmit = async() => {

      const person = {
        username: username.value,
        password: password.value,
        email: email.value,
        first_name: firstname.value,
        last_name: lastname.value,
        user_type: userType.value,
        orientation: orientation.value.id,
      };

      await BackendRequest.register(person);

      await router.push('/bachelors');
      await router.go(0);
  }

  onMounted(() => {
    fetchOrientationItems();
  });

</script>

<template>
  <div>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <ul class="form">
        <li class="form-item">
          <q-input color="primary"
                   v-model="username"
                   label="Nom d'utilisateur"
                   :rules="[requiredField]"
                   autofocus
                   autocomplete="username"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </li>

        <li class="form-item">
          <q-input color="primary"
                   v-model="lastname"
                   label="Nom"
                   :rules="[requiredField]"
          >
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
          <q-input color="primary" v-model="email" autocomplete="email" type="email" label="Adresse e-mail" :rules="[requiredField]">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
        </li>

        <li class="form-item">
          <q-input v-model="password"
                   autocomplete="password"
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
                   autocomplete="new-password"
                   label="Confirmation du mot de passe"
                   :rules="[requiredField, passwordMatches]">
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
          <q-radio dense v-model="userType" val="student" label="Étudiant" />
          <q-radio dense v-model="userType" val="teacher" label="Enseignant" />
        </li>

        <li class="form-item" v-show="userType === 'student'">
          <q-select v-model="orientation"
                    :options="orientationItems"
                    label="Orientation"
                    option-value="id"
                    option-label="name"
                    :rules="[requiredField]">
            <template v-slot:prepend>
              <q-icon name="school" />
            </template>
          </q-select>
        </li>

        <li class="form-item">
          <PrimaryButton text="Inscription" type="submit" />
        </li>

        <li class="form-item">
          <p class="text-center">Déjà un compte !
            <router-link class="text-secondary text-bold" :to="{ name : 'login' }">Connectez-vous !</router-link>
          </p>
        </li>
      </ul>
    </q-form>
  </div>
</template>

<style scoped lang="scss">

  .form-item-radio {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }

</style>