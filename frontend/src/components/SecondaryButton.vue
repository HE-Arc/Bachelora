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
    },
    dashed: {
      type: Boolean,
      required: false,
      default: false
    }
  });
</script>

<template>
  <div class="text-center">
    <q-btn flat class="btn btn-secondary" :class="{dashed: props.dashed}" :icon="props.icon" v-if="link" :to="{ name : props.link }" size="md" :label="props.text" />
    <q-btn flat class="btn btn-secondary" :class="{dashed: props.dashed}" :icon="props.icon" v-else size="md" :label="props.text" />
  </div>

</template>

<style scoped lang="scss">
  .btn-secondary {
    background-color: $secondary;
    color: white;
    max-width: 100%;
    min-width: 100%;
  }

  .dashed {
    border: dashed 2px $secondary;
    color: $secondary;
    background-color: transparent;
  }
</style>