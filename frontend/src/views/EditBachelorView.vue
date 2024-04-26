<script setup>
import { useRoute } from 'vue-router';
import {computed, onMounted, ref} from 'vue';

import Title from "@/components/Title.vue";
import EditBachelorForm from "@/components/form/EditBachelorForm.vue";
import BackButton from "@/components/BackButton.vue";
import BackendRequest from "@/request/request.js";

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
    <BackButton link="bachelors" />
    <Title text="Modification d'un travail de bachelor" />
    <EditBachelorForm :bachelor="bachelor" />
  </section>
</template>

<style scoped lang="scss">

</style>