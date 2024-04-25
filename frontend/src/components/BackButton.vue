<script setup>

import router from "@/router/index.js";

const goBack = () => {
  router.go(-1);
};

</script>

<template>
  <q-btn
      flat
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
  padding: 0;
}

</style>