<script setup>

import {ref, defineProps} from "vue";
import Title from "@/components/Title.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  btnTextSubmit: {
    type: String,
    required: true
  },
  btnTextCancel: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false
  },
})

const dialog = ref(false);

const toggleDialog = () => {
  dialog.value = !dialog.value;
};

</script>

<template>

  <q-btn
      no-caps
      @click="toggleDialog"
    />

  <q-dialog v-model="dialog" backdrop-filter="brightness(60%)">

    <q-card class="q-pa-md">

      <div v-show="props.icon" class="q-pt-lg text-center">
        <q-avatar size="64px" :icon="props.icon" color="red" text-color="white" />
      </div>

      <q-card-section class="row items-center q-pb-none text-h6">

      </q-card-section>

      <q-card-section>
        {{props.text}}
      </q-card-section>

      <q-card-actions align="evenly">
        <PrimaryButton v-close-popup :text="props.btnTextSubmit" />
        <SecondaryButton v-close-popup :text="props.btnTextCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">

</style>