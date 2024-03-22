<script setup>
import axios from "axios";
import {ref, onMounted, computed} from "vue";

import BachelorCard from "@/components/card/BachelorCard.vue";
import Title from "@/components/Title.vue";

import SecondaryButton from "@/components/SecondaryButton.vue";
import MultiChipsSelect from "@/components/MultiChipsSelect.vue";

const tagsItems = ref([]);

const fetchTagsItems = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/tag/");

  tagsItems.value = res.data;
};


let originalBachelorsItems;
const bachelorsItems = ref([]);

const fetchBachelorsItems = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/bachelor/");
  const sortedData = res.data.sort((a, b) => b.id - a.id);
  bachelorsItems.value = sortedData;
  originalBachelorsItems = sortedData;
};

let previousFilteredBachelorsItems = [];
const updateBachelorsItems = (selectedTags) => {
  // Display all bachelors
  if (selectedTags.length === 0) {
    bachelorsItems.value = originalBachelorsItems;
    return;
  }

  // Exactract id tags selected
  const selectedTagIds = selectedTags.map(tag => tag.id);

  // Filter with selected tags
  const filteredBachelors = originalBachelorsItems.filter(bachelor => {
    const hasAtLeastOneTag = bachelor.tags && selectedTagIds.some(tagId => bachelor.tags.includes(tagId));
    const hasAllTags = bachelor.tags && selectedTagIds.every(tagId => bachelor.tags.includes(tagId));
    return hasAtLeastOneTag && hasAllTags;
  });

  // Store filter list as previous list
  previousFilteredBachelorsItems = [...filteredBachelors];

  // Update with filter list
  bachelorsItems.value = [...filteredBachelors];
};

onMounted(() => {
  fetchBachelorsItems();
  fetchTagsItems();
});


// Pagination
const currentPage = ref(1);
const maxBachelorsPerPage = 6;
const totalPages = computed(() => Math.ceil(bachelorsItems.value.length / maxBachelorsPerPage));

// Update list in function of current page
const displayBachelors = computed(() => {
  const startIndex = (currentPage.value - 1) * maxBachelorsPerPage;
  const endIndex = startIndex + maxBachelorsPerPage;
  return bachelorsItems.value.slice(startIndex, endIndex);
});

const updateCurrentPage = (page) => {
  currentPage.value = page;
};


// Switch display grid / list
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

    <MultiChipsSelect class="space center" icon="filter_alt" label="Tags" :options="tagsItems" @selection-changed="updateBachelorsItems" />

    <ul class="space bachelors-display-style center">
      <li><q-icon class="bachelors-style grid" size="md" @click="toggleBachelorsDisplayStyle" name="grid_view" /></li>
      <li><q-icon class="bachelors-style active list" size="md" @click="toggleBachelorsDisplayStyle" name="list" /></li>
    </ul>

    <ul id="bachelors" class="bachelors">
      <template v-if="displayBachelors.length === 0">
        <p>Aucun résultat trouvé.</p>
      </template>
      <template v-else>
        <li class="item-bachelor" v-for="bachelor in displayBachelors" :key="bachelor">
          <BachelorCard :bachelor="bachelor"/>
        </li>
      </template>
    </ul>

    <div class="q-pa-lg flex flex-center">
      <q-pagination color="secondary"
        v-model="currentPage"
        :max="totalPages"
        direction-links
        @input="updateCurrentPage"
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