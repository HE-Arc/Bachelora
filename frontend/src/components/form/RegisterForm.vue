<script setup>

  import PrimaryButton from "@/components/PrimaryButton.vue";
  import { onMounted, ref} from "vue";
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

  const userType = ref('student');
  const orientation = ref('');


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

    const response = await BackendRequest.register(person);

    if(response === true)
    {
      router.push({name: 'bachelors'});
    }
}

const options = [
  {
    label: 'Étudiant',
    value: 'student'
  },
  {
    label: 'Enseignant',
    value: 'teacher'
  },
];

onMounted(() => {
  fetchOrientationItems();
});

const requiredField = (val) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(!!val || 'Ce champ est requis');
      }, 1000)
    })
};

const matchesPassword = (val) => {
  return val === password.value || "Mots de passe différents";
}

</script>

<template>
  <section>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <ul class="form">
        <li class="form-item">
          <q-input color="primary"
                   v-model="username"
                   label="Nom d'utilisateur"
                   type="text"
                   autofocus
                   :rules="[requiredField]">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </li>

        <li class="form-item">
          <q-input color="primary"
                   v-model="lastname"
                   label="Nom de famille"
                   type="text"
                   :rules="[requiredField]">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </li>

        <li class="form-item">
          <q-input color="primary"
                   v-model="firstname"
                   label="Prénom"
                   type="text"
                   :rules="[requiredField]">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </li>

        <li class="form-item">
          <q-input color="primary"
                   v-model="email"
                   label="Adresse e-mail"
                   autocomplete="email"
                   type="email"
                   :rules="[requiredField]">
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
                   lazy-rules
                   :rules="[requiredField, matchesPassword]">
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
          <q-field borderless>
            <div class="q-pa-lg">
              <q-option-group
                  v-model="userType"
                  :options="options"
                  color="primary"
                  inline
              />
            </div>
          </q-field>
        </li>

        <li class="form-item" v-if="userType === 'student'">
          <q-select v-model="orientation"
                    :options="orientationItems"
                    label="Orientation"
                    option-value="id"
                    option-label="name"
                    :rules="[requiredField]"
          >
            <template v-slot:prepend>
              <q-icon name="school" />
            </template>
          </q-select>
        </li>

        <li class="form-item btns">
          <PrimaryButton class="btn-action" text="Inscription" type="submit"/>
        </li>

        <li class="form-item">
          <p class="text-center">Déjà un compte !
            <router-link class="text-secondary text-bold" :to="{ name : 'login' }">Connectez-vous !</router-link>
          </p>
        </li>
      </ul>
    </q-form>
  </section>
</template>

<style scoped lang="scss">

  .form-item-radio {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }

</style>