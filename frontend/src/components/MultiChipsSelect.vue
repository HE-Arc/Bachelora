<script setup>

import {ref, defineProps, watch} from "vue";

const emit = defineEmits(['selection-changed', 'submit']);

  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
  });


  const model = ref([]);

  watch(model, (newValue) => {
      emit('selection-changed', newValue);
    });

</script>

<template>
  <div>
    <q-select
        class="chips-items"
        v-model="model"
        multiple
        :options="props.options"
        option-value="id"
        option-label="name"
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
</style>