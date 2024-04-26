<script setup>

import router from "@/router/index.js";

const props = defineProps({
  link: {
    type: String,
    required: false
  }
});

const goBack = () => {
  if (!props.link)
  {
    router.go(-1);
  }
};

</script>

<template>
  <q-btn
      flat
      :to="props.link ? { name: props.link } : null"
      icon="arrow_back_ios_new"
      color="primary"
      size="md"
      class="backButton"
      @click="goBack">
      Retour
  </q-btn>
</template>

<style scoped lang="scss">

.backButton {
  padding: 0 0.5rem 0 0;
}

</style>