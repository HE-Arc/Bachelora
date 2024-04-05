<script setup>

import {ref, defineProps, watch, toRefs} from "vue";

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
    edit: {
      type: Boolean,
      required: false,
      default: false
    },
    selectedItems: {
      type: Array,
      required: false,
    }
  });


const model = ref([]);
const items = ref([]);

const { edit, selectedItems } = toRefs(props);

watch(items, (newValue) => {
      emit('selection-changed', newValue);
    });

watch(
  [edit, selectedItems, model],
  () => {
    if (props.edit) {
      items.value = [...props.selectedItems];
    } else {
      items.value = [...model.value];
    }
  },
  { deep: true }
);

</script>

<template>
  <div>
    <q-select
        class="chips-items"
        v-model="items"
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