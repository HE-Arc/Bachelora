<script setup>

import {onMounted, ref} from 'vue'
import PrimaryButton from "@/components/PrimaryButton.vue";
import MultiChipsSelect from "@/components/MultiChipsSelect.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";
import axios from "axios";

const title = ref(null);
const description = ref(null);
const teacher = ref(null)
const orientation = ref(null);
const tags = ref([]);

const tagsItems = ref([]);

const fetchTagsItems = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/tag/");

  tagsItems.value = res.data;
};

const orientationItems = ref([]);
const fetchOrientationItems = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/orientation/");
  orientationItems.value = res.data;
};

const teachersItems = ref([]);
const fetchTeachersItems = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/teacher/");
    teachersItems.value = res.data.map(teacher => {
      teacher.fullname = `${teacher.first_name} ${teacher.last_name}`;
      return {
        id: teacher.id,
        fullname: teacher.fullname
      }
    });
  } catch (error) {
    console.error(`Erreur lors de la récupération des enseignants : `, error);
  }
};

onMounted(() => {
  fetchTagsItems();
  fetchOrientationItems();
  fetchTeachersItems();
});

const updateBachelorsItems = (selectedTags) => {
  tags.value = [];
  for(const tag of selectedTags) {
    tags.value.push(tag.id);
  }
}

const success = ref(false);
const onSubmit = async() => {
    try {
      success.value = false;
      await axios.post("http://127.0.0.1:8000/api/bachelor/",
      {
        name: title.value,
        description: description.value,
        teacher: teacher.value.id,
        orientations: [orientation.value.id],
        tags: tags.value
      });
      success.value = true;

      // Réinitialisation des champs après l'envoi réussi
    title.value = null;
    description.value = null;
    teacher.value = null;
    orientation.value = null;
    tags.value = [];

    } catch (e) {
      console.log(e);
    }
}

const requiredField = (val) => {
  return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(!!val || 'Ce champ est requis');
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
        <q-select v-model="teacher"
                  :options="teachersItems"
                  label="Enseignant proposant"
                  :rules="[requiredField]"
                  option-value="id"
                  option-label="fullname"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-select>
      </li>

      <li class="form-item">
        <q-select v-model="orientation"
                  :options="orientationItems"
                  label="Orientation"
                  :rules="[requiredField]"
                  option-value="id"
                  option-label="name"
        >
          <template v-slot:prepend>
            <q-icon name="school" />
          </template>
        </q-select>
      </li>

      <li class="form-item">
        <MultiChipsSelect :options="tagsItems" label="Tags" icon="sell" @selection-changed="updateBachelorsItems" />
      </li>

      <li class="form-item btns">
        <PrimaryButton class="btn-action" text="Ajouter" type="submit"/>
        <SecondaryButton class="btn-action" text="Annuler" link="bachelors" />
      </li>
    </ul>
  </q-form>
</template>

<style scoped lang="scss">
  .btn-action {
      margin: 1rem 0;
  }

  @media only screen and (min-width: 1024px) {
    .btns {
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      .btn-action {
        min-width: 45%;
        max-width: 45%;
      }
    }
  }
</style>