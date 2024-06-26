<script setup>
import {ref, onMounted, computed} from "vue";

import BachelorCard from "@/components/card/BachelorCard.vue";
import Title from "@/components/Title.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";
import MultiChipsSelect from "@/components/MultiChipsSelect.vue";
import DeleteBachelorForm from "@/components/form/DeleteBachelorForm.vue";
import BackendRequest from '@/request/request.js';
import Cookie from "@/cookies/cookies.js";

const tagsItems = ref([]);
const fetchTagsItems = async () => {
  tagsItems.value = (await BackendRequest.fetchAllTags()).data;
};

let originalBachelorsItems;
const bachelorsItems = ref([]);

const fetchBachelorsItems = async () => {
  const res = await BackendRequest.fetchAllBachelors();
  bachelorsItems.value = res;
  originalBachelorsItems = res;
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

const bachelorToDeleteID =  ref(null);
const getItemDeleteId = (data) => {
  bachelorToDeleteID.value = data;
  openDialog();
}

const stateDialog = ref(false);
const openDialog = () => {
  stateDialog.value = true;
};

const closeDialog = () => {
  stateDialog.value = false;
  fetchBachelorsItems();
}

</script>

<template>
  <section>
    <Title text="Liste des travaux de bachelors"/>

    <SecondaryButton
        v-if="Cookie.getUser()!== null && Cookie.getUser().user_type === 'teacher'"
        class="space center"
        dashed
        link="bachelors.create"
        text="Ajouter un travail de bachelor"
        icon="add"/>

    <MultiChipsSelect class="space center" icon="filter_alt" label="Tags" :options="tagsItems" @selection-changed="updateBachelorsItems" />

    <DeleteBachelorForm
      title="Suppression d'un travail de bachelor"
      icon="dangerous"
      btn-text-submit="Oui, supprimer"
      btn-text-cancel="Non, annuler"
      :state="stateDialog"
      @close-custom="closeDialog"
      :item-delete-id="bachelorToDeleteID"
    />

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
          <BachelorCard :bachelor="bachelor" @get-item-delete-id="getItemDeleteId"/>
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