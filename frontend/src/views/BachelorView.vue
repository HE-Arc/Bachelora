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

  fetchOrientationsNames();
};

const bachelorOrientationsName = ref([]);
const fetchOrientationsNames = async () => {
  for (const orientation of bachelor.value.orientations) {
    const orientationName = await BackendRequest.getOrientationName(orientation);
    bachelorOrientationsName.value.push(orientationName);
  }
}

onMounted(() => {
  fetchBachelor();
});

</script>

<template>
  <div>
    <section>
      <BackButton />

      <Title :text="bachelor.name"/>

      <p class="q-my-auto text-justify">{{ bachelor.description }}</p>

      <br>

      <p>Enseignant ayant entré le travail : <em>{{ bachelor.teacherName }}</em></p>

      <p>Orientation : <em v-for="(orientation, index) in bachelorOrientationsName" :key="orientation">
        {{ orientation }} <span v-if="index < bachelorOrientationsName.length - 1">, </span></em>
      </p>

      <div class="text-center">
        <q-chip v-for="tag in bachelor.tagsItems" :key="tag">
          {{ tag.name }}
        </q-chip>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
</style>