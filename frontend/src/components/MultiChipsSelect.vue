<script setup>

  import {ref, defineProps } from "vue";

  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
  })

  const model = ref([]);

</script>

<template>
  <div>
    <q-select
        class="chips-items"
        v-model="model"
        multiple
        :options="props.options"
        use-chips
        stack-label
        :label="props.label">
      <template v-slot:prepend>
        <q-icon :name="props.icon" />
      </template>
    </q-select>
  </div>
</template>

<style scoped lang="scss">
  .chips-items {
    margin: 2rem 0;
  }
</style>