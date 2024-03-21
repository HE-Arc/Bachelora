<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

import BachelorCard from "@/components/card/BachelorCard.vue";
import Title from "@/components/Title.vue";

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

const tagsItems = ref([]);

const fetchTagsItems = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/tag/");

  tagsItems.value = res.data;
};


const bachelorsItems = ref([]);

const fetchBachelorsItems = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/bachelor/");
  bachelorsItems.value = res.data;
};

onMounted(() => {
  fetchBachelorsItems();
  fetchTagsItems();
});

const toggleBachelorsDisplayStyle = (e) => {
  const elementClicked = e.target;

  document.querySelectorAll(".bachelors-style").forEach(element => {
    element.classList.remove("active");
  });

  const bachelors = document.querySelector("#bachelors");
  const btnBachelorsDisplay = document.querySelector(".bachelors-display-style");

  if(elementClicked.classList.contains("grid")) {
    elementClicked.classList.add("active");
    bachelors.classList.add("bachelors-grid");
    btnBachelorsDisplay.classList.remove("center");
  } else {
    elementClicked.classList.add("active");
    bachelors.classList.remove("bachelors-grid");
    btnBachelorsDisplay.classList.add("center");
  }
};


</script>

<template>
  <section>
    <Title text="Liste des travaux de bachelors"/>

    <SecondaryButton class="space center" dashed link="bachelors.create" text="Ajouter un travail de bachelor" icon="add"/>

    <MultiChipsSelect class="space center" icon="filter_alt" label="Tags" :options="tagsOptions" />

    <ul class="space bachelors-display-style center">
      <li><q-icon class="bachelors-style grid" size="md" @click="toggleBachelorsDisplayStyle" name="grid_view" /></li>
      <li><q-icon class="bachelors-style active list" size="md" @click="toggleBachelorsDisplayStyle" name="list" /></li>
    </ul>
    
    <ul id="bachelors" class="bachelors">
      <li class="item-bachelor" v-for="bachelor in bachelorsItems" :key="bachelor">
        <BachelorCard :bachelor="bachelor"/>
      </li>
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

  .space {
    padding: 1rem 0;
  }

  .center {
    max-width: 720px;
    margin: 0 auto;
  }

  .bachelors {
    margin-top: 2rem;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .bachelors-display-style {
    display: none;
  }

  @media only screen and (min-width: 768px) {

    // Toggle grid / list view
    .bachelors-display-style {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 0.25rem;

      .bachelors-style {
        border: solid 1px $secondary;
        color: $secondary;
        padding: 0.25rem;
        border-radius: 3px;
      }

      .active {
        background-color: $secondary;
        color: white;
      }
    }

    .bachelors-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

  }

  @media only screen and (min-width: 1024px) {
    .bachelors-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>