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
    type: {
      type:String,
      required: false,
      default: "button"
    }
  })
</script>

<template>
  <q-btn
      color="primary"
      class="btn btn-primary"
      :to="props.link ? { name: props.link } : null"
      size="md"
      :label="props.text"
      :type="props.type" />
</template>

<style scoped lang="scss">

  .btn-primary {
    max-width: 100%;
    min-width: 100%;
    margin: 0.5rem 0;
    font-weight: bold;
  }
</style>