<script setup>
  const props = defineProps(["text"]);
</script>

<template>
  <h1>{{props.text}}</h1>
</template>

<style scoped lang="scss">
  h1 {
    font-size: 2rem;
    line-height: 2rem;
    color: $primary;
    font-weight: bold;
    text-align: center;
    padding: 1rem;
    margin: 0.5rem;
  }
</style>