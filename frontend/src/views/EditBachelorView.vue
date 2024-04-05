<script setup>

import Title from "@/components/Title.vue";
import EditBachelorForm from "@/components/form/EditBachelorForm.vue";

import { useRoute } from 'vue-router';
import {computed, onMounted, ref} from 'vue';
import axios from "axios";
import BackButton from "@/components/BackButton.vue";

const API_LINK = import.meta.env.VITE_API_LINK;

const route = useRoute();
const id = computed(() => route.params.id);

const bachelor = ref([]);
const fetchBachelor = async () => {
  try {
    const bachelorData = await axios.get(`${API_LINK}api/bachelor/${id.value}/`);
    bachelor.value = bachelorData.data;

    bachelor.value.tagsItems = [];
    for (const id of bachelor.value.tags) {
      try {
        const tags = await axios.get(`${API_LINK}api/tag/${id}/`);
        bachelor.value.tagsItems.push(tags.data);
      } catch (error) {
        console.error(`Erreur lors de la récupération des tags : `, error);
      }
    }

    const res = await axios.get(`${API_LINK}api/teacher/${bachelor.value.teacher}/`);
    bachelor.value.teacher = res.data.id;
  } catch (error) {
    console.error(`Erreur lors de la récupération des tags : `, error);
  }
};

onMounted(() => {
  fetchBachelor();
});

</script>

<template>
  <section>
    <BackButton link="bachelors" />
    <Title text="Modification d'un travail de bachelor" />
    <EditBachelorForm :bachelor="bachelor" />
  </section>
</template>

<style scoped lang="scss">

</style>