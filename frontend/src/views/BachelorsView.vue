<script setup>
import { ref } from 'vue'

import Title from "@/components/Title.vue";
import Card from "@/components/card/BachelorCard.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";
import MultiChipsSelect from "@/components/MultiChipsSelect.vue";

const currentPage = ref(1);

const tagsOptions = [
    "IA",
    "Laravel",
    "Django",
    "Traitement d'images",
    "Java",
    "C++",
    "Dev web"
];

</script>

<template>
  <section>
    <Title text="Liste des travaux de bachelors"/>

    <SecondaryButton text="Ajouter un travail de bachelor" icon="add"/>

    <MultiChipsSelect icon="filter_alt" label="Tags" :options="tagsOptions" />

    <ul class="list-bachelors">
      <li class="item-bachelor" v-for="card in 10" :key="card"><Card /></li>
    </ul>

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

  .list-bachelors {
    margin-top: 2rem;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
</style>