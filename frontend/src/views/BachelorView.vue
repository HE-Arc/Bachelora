<script setup>

import Title from "@/components/Title.vue";
import BackButton from "@/components/BackButton.vue";

import {useRoute} from 'vue-router';
import {computed, onMounted, ref} from 'vue';
import BackendRequest from '@/request/request.js';

const route = useRoute();
const id = computed(() => route.params.id);

const bachelor = ref([]);
const fetchBachelor = async () => {
  bachelor.value = await BackendRequest.fetchBachelorById(id.value);
};

onMounted(() => {
  fetchBachelor();
});

</script>

<template>
  <section>
    <BackButton />

    <Title :text="bachelor.name"/>

    <p class="q-my-auto text-justify">{{ bachelor.description }}</p>

    <br>

    <p>Enseignant ayant entré le travail : <em>{{ bachelor.teacherName }}</em></p>
    <div class="text-center">
      <q-chip v-for="tag in bachelor.tagsItems" :key="tag">
        {{ tag.name }}
      </q-chip>
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>