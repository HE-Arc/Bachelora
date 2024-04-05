<script setup>

// Imports
import {onMounted, ref, computed, watch, onUpdated} from "vue";
import axios from "axios";

// Imports components
import MultiChipsSelect from "@/components/MultiChipsSelect.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";
import router from "@/router/index.js";
import {useQuasar} from "quasar";

const API_LINK = import.meta.env.VITE_API_LINK;

const props = defineProps({
  bachelor: {
    type: Object,
    required: true
  }
});


const title = ref('');
const description = ref('');
const teacher = ref('');
const selectedOrientations = ref([]);
const orientation = ref(null);
const tags = ref([]);

// Check fields validity
const requiredField = (val) => {
  return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(!!val || 'Ce champ est requis');
        }, 1000)
      })
};


// Get all orientations
const orientationItems = ref([]);
const fetchOrientationItems = async () => {
  const res = await axios.get(API_LINK + "api/orientation/");
  orientationItems.value = res.data;
};


// Get orientations labels of the bachelor
const selectedOrientationLabel = computed( () => {
  let selectedOrientation = [];

  if(props.bachelor.orientations) {
    for (let i = 0; i < props.bachelor.orientations.length; i++)
    {
      selectedOrientation.push(orientationItems.value.find(option => option.id === props.bachelor.orientations[i]));
    }
  }

  return selectedOrientation;
});

// Update orientations select
watch(
  [orientation, selectedOrientationLabel],
  () => {
    selectedOrientations.value = selectedOrientationLabel.value;
  },
  { deep: true }
);

// Get all tags
const tagsItems = ref([]);
const fetchTagsItems = async () => {
  const res = await axios.get(API_LINK + "api/tag/");
  tagsItems.value = res.data;
};

// Update tags select
const updateBachelorsItems = (selectedTags) => {
  tags.value = [];
  for(const tag of selectedTags) {
    tags.value.push(tag.id);
  }
}

// Get tags labels of bachelor
const selectedTagsLabel = computed( () => {
  let selectedTags = [];

  if(props.bachelor.tags) {
    for (let i = 0; i < props.bachelor.tags.length; i++)
    {
      selectedTags.push(tagsItems.value.find(option => option.id === props.bachelor.tags[i]));
    }
  }

  return selectedTags;
});


onMounted(() => {
  fetchOrientationItems();
  fetchTagsItems();
});

onUpdated(() => {
  title.value = props.bachelor.name;
  description.value = props.bachelor.description;
  teacher.value = props.bachelor.teacher;
})

const success = ref(false);
const onSubmit = async() => {
    try {

      const selectedOrientationID = [];
      for (const item in selectedOrientations.value) {
        selectedOrientationID.push(selectedOrientations.value[item].id);
      }

      const selectedTagsID = [];
      for (const item in tags.value) {
        selectedTagsID.push(tags.value[item]);
      }

      success.value = false;
      await axios.put(API_LINK + "api/bachelor/" + props.bachelor.id + "/",
      {
        url: props.bachelor.url,
        id: props.bachelor.id,
        name: title.value,
        description: description.value,
        teacher: teacher.value,
        tags: selectedTagsID,
        orientations: selectedOrientationID,
      });
      success.value = true;
      showNotif();
    } catch (e) {
      console.log(e);
    }
}

const $q = useQuasar();
const showNotif = () => {
  $q.notify({
    type: 'positive',
    message: 'Modification effectuée avec succès !',
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
        <q-select v-model="selectedOrientations"
                  multiple
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
        <MultiChipsSelect
            :options="tagsItems"
            label="Tags"
            icon="sell"
            @selection-changed="updateBachelorsItems"
            edit
            :selected-items="selectedTagsLabel" />
      </li>

      <li class="form-item btns">
        <PrimaryButton class="btn-action" text="Modifier" type="submit"/>
        <SecondaryButton class="btn-action" text="Annuler" link="bachelors" />
      </li>
    </ul>
  </q-form>
</template>

<style scoped lang="scss">

</style>