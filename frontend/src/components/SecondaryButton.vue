<script setup>
  const props = defineProps({
    text: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false
    }
  })
</script>

<template>
  <div class="text-center">
    <q-btn v-if="link" text-color="secondary" :to="{ name : props.link }" size="md" :label="props.text" />
    <q-btn v-else text-color="secondary" size="md" :label="props.text" />
  </div>

</template>

<style scoped lang="scss">

</style>