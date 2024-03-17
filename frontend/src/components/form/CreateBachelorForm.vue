<script setup>

import { ref } from 'vue'
import PrimaryButton from "@/components/PrimaryButton.vue";
import MultiChipsSelect from "@/components/MultiChipsSelect.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";

const title = ref('');
const description = ref('');
const compagny = ref('')
const orientation = ref('');

const tagsOptions = [
    "IA",
    "Laravel",
    "Django",
    "Traitement d'images",
    "Java",
    "C++",
    "Dev web"
];

const orientationOptions = [
    "IL",
    "IE",
    "ID"
];

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

const requiredField = (val) => {
  return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(!!val || 'Ce champ est requis')
        }, 1000)
      })
};


</script>

<template>
  <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
    <ul class="form">
      <li class="form-item">
        <q-input color="primary"
                 v-model="title"
                 label="Titre"
                 type="text"
                 autofocus
                 :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="title" />
          </template>
        </q-input>
      </li>

      <li class="form-item">
        <q-input color="primary"
                 v-model="description"
                 label="Description"
                 type="textarea"
                 autogrow
                 :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="subject" />
          </template>
        </q-input>
      </li>

      <li class="form-item">
        <q-input color="primary"
                 v-model="compagny"
                 label="Entreprise"
                 type="text"
                 :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="apartment" />
          </template>
        </q-input>
      </li>

      <li class="form-item">
        <q-select v-model="orientation" :options="orientationOptions" label="Orientation" :rules="[requiredField]">
          <template v-slot:prepend>
            <q-icon name="school" />
          </template>
        </q-select>
      </li>

      <li class="form-item">
        <MultiChipsSelect :options="tagsOptions" label="Tags" icon="sell" />
      </li>

      <li class="form-item">
        <PrimaryButton text="Ajouter" />
      </li>

      <li class="form-item">
        <SecondaryButton text="Annuler" link="bachelors" />
      </li>
    </ul>
  </q-form>
</template>

<style scoped lang="scss">

</style>