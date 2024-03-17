<script setup>
  const props = defineProps({
    text: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    }
  });
</script>

<template>
  <div class="text-center">
    <q-btn flat class="btn btn-secondary" :icon="props.icon" v-if="link" text-color="secondary" :to="{ name : props.link }" size="md" :label="props.text" />
    <q-btn flat class="btn btn-secondary" :icon="props.icon" v-else text-color="secondary" size="md" :label="props.text" />
  </div>

</template>

<style scoped lang="scss">
  .btn-secondary {
    border: dashed 2px $secondary;
    color: $secondary;
    max-width: 100%;
    min-width: 100%;
  }
</style>