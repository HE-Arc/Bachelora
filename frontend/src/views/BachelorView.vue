<script setup>

import Title from "@/components/Title.vue";

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
    bachelor.value.teacher = res.data.first_name + " " + res.data.last_name;

    console.log(bachelor);
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

    <Title :text="bachelor.name"/>

    <p class="q-my-auto text-justify">{{ bachelor.description }}</p>

    <br>

    <p>Enseignant ayant entré le travail : <em>{{ bachelor.teacher }}</em></p>
    <div class="text-center">
      <q-chip v-for="tag in bachelor.tagsItems" :key="tag">
        {{ tag.name }}
      </q-chip>
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>