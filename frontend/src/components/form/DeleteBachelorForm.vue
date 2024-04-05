<script setup>

import {ref, defineProps, defineEmits, watch} from "vue";
import Title from "@/components/Title.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";
import axios from "axios";
import {useQuasar} from "quasar";

const props = defineProps({
  title: {
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
  state: {
    type: Boolean,
    required: true,
    default: false
  },
  itemDeleteId: {
    type: Number,
    required: false,
  }
})

const API_LINK = import.meta.env.VITE_API_LINK;

const dialog = ref(props.state);
watch(() => props.state, (newValue) => {
  if(newValue === true)
  {
    fetchBachelor();
  }
  dialog.value = newValue;
});


const closeDialog = () => {
  dialog.value = false;
  closeCustom();
};

const emit = defineEmits(['closeCustom']);
const closeCustom = () => emit('closeCustom');

const bachelor = ref(null);
const fetchBachelor = async () => {
  if (props.itemDeleteId)
  {
    try
    {
      const bachelorData = await axios.get(`${API_LINK}api/bachelor/${props.itemDeleteId}/`);
      bachelor.value = bachelorData.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du bachelor ayant l'id ${props.itemDeleteId} : `, error);
    }
  }
}

const success = ref(false);
const deleteItem = async () => {
  if (props.itemDeleteId)
  {
    try {
      success.value = false;
      await axios.delete(`${API_LINK}api/bachelor/${props.itemDeleteId}/`);
      success.value = true;
      showNotif();
    } catch (error) {
      console.error(`Erreur lors de la suppression du bachelor ayant l'id ${props.itemDeleteId} : `, error);
    }
    closeDialog();
  }
};

const $q = useQuasar();
const showNotif = () => {
  $q.notify({
    type: 'positive',
    message: `Le bachelor <em>${bachelor.value.name}</em> a bien été supprimé !`,
  })
}

</script>

<template>
  <q-dialog v-model="dialog" backdrop-filter="brightness(60%)">

    <q-card class="q-pa-md">

      <div v-show="props.icon" class="q-pt-lg text-center">
        <q-avatar size="64px" :icon="props.icon" color="red" text-color="white" />
        <Title text="Suppression" class="danger" />
      </div>

      <q-card-section class="row items-center q-pb-none text-h6">

      </q-card-section>

      <q-card-section v-if="bachelor">
        Attention ! Vous êtes sur le point de supprimer le travail <strong>{{bachelor.name}}</strong>. <br>
        Cette action est <strong>définitive</strong> et <strong>irréversible</strong> !
      </q-card-section>

      <q-card-actions align="evenly">
        <SecondaryButton text="" />
        <PrimaryButton link="bachelors" :text="props.btnTextSubmit" @click="deleteItem"/>
        <SecondaryButton autofocus v-close-popup link="bachelors" :text="props.btnTextCancel" @click="closeDialog"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
  .danger {
      color: orangered;
  }

  strong {
    color: $primary;
    font-weight: bold;
    font-style: italic;
  }
</style>