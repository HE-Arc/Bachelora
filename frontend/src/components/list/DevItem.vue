<script setup>

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
});

</script>

<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar color="secondary" text-color="white" icon="code" />
    </q-item-section>
    <q-item-section>{{ props.name }}</q-item-section>
  </q-item>
</template>

<style scoped>

</style>