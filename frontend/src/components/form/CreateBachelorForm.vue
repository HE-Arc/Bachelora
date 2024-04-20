<script setup>

import {onMounted, ref} from 'vue'
import PrimaryButton from "@/components/PrimaryButton.vue";
import MultiChipsSelect from "@/components/MultiChipsSelect.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";
import router from "@/router/index.js";
import {useQuasar} from "quasar";
import BackendRequest from "@/request/request.js";


const title = ref(null);
const description = ref(null);
const teacher = ref(null)
const orientations = ref([]);
const tags = ref([]);

const tagsItems = ref([]);

const fetchTagsItems = async () => {
  const res = await BackendRequest.fetchAllTags();
  tagsItems.value = res.data;
};

const orientationItems = ref([]);
const fetchOrientationItems = async () => {
  const res = await BackendRequest.fetchAllOrientations();
  orientationItems.value = res.data;
};

const teachersItems = ref([]);
const fetchTeachersItems = async () => {
    const res = await BackendRequest.fetchAllTeachers();
    teachersItems.value = res.data.map(teacher => {
      teacher.fullname = `${teacher.first_name} ${teacher.last_name}`;
      return {
        id: teacher.id,
        fullname: teacher.fullname
      }
    });
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

const onSubmit = async() => {

    const selectedOrientationsID = [];
    for (const item in orientations.value) {
      selectedOrientationsID.push(orientations.value[item].id);
    }

    const response = await BackendRequest.createBachelor({
      name: title.value,
      description: description.value,
      teacher: teacher.value.id,
      orientations: selectedOrientationsID,
      tags: tags.value
    });

    showNotif();
    router.push("/bachelors/" + response.data.id);
}

const requiredField = (val) => {
  return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(!!val || 'Ce champ est requis');
        }, 1000)
      })
};

const $q = useQuasar();
const showNotif = () => {
  $q.notify({
    type: 'positive',
    message: 'Nouveau bachelor ajouté !',
  })
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
        <q-select v-model="orientations"
                  :options="orientationItems"
                  multiple
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