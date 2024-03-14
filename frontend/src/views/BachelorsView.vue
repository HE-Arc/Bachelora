<script setup>
import { ref } from 'vue'

import Title from "@/components/Title.vue";
import Card from "@/components/card/Card.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";

const currentPage = ref(1);

</script>

<template>
  <section>
    <Title text="Liste des travaux de bachelors"/>

    <SecondaryButton text="Ajouter un travail de bachelor"/>

    <Card v-for="card in 10" :key="card" />

    <div class="q-pa-lg flex flex-center">
      <q-pagination color="secondary"
        v-model="currentPage"
        :max="5"
        direction-links
      />
    </div>

  </section>
</template>

<style scoped lang="scss">

</style>