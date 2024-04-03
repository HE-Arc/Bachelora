<script setup>

const props = defineProps({
  link : {
    type: String,
    required: true
  }
})

</script>

<template>
  <router-link :to="{ name: props.link }" class="backButton">
      <q-icon name="arrow_back_ios_new" />
      Retour
  </router-link>
</template>

<style scoped lang="scss">

.backButton {
  padding: 0;
}

</style>