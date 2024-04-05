<script setup>

  import {ref, defineProps, onMounted } from "vue";
  import axios from "axios";
  import router from "@/router/index.js";

  const API_LINK = import.meta.env.VITE_API_LINK;

  const props = defineProps({
    bachelor: {
      type: Object,
      required: true
    },
  });

  const tagsItems = ref([]);
  const fetchTagsItems = async () => {
    for (const id of props.bachelor.tags) {
      try {
        const res = await axios.get(`${API_LINK}api/tag/${id}/`);
        tagsItems.value.push(res.data);
      } catch (error) {
        console.error(`Erreur lors de la récupération des tags : `, error);
      }
    }
  };

  const teacherName = ref('');
  const fetchTeacher = async () => {
    try {
      const res = await axios.get(`${API_LINK}api/teacher/${props.bachelor.teacher}/`);
      teacherName.value = res.data.first_name + " " + res.data.last_name;
    } catch (error) {
      console.error(`Erreur lors de la récupération des tags : `, error);
    }
  };

  onMounted(() => {
    fetchTagsItems();
    fetchTeacher();
  });

  const showDetail = async () => {
    await router.push({
          name: 'bachelors.detail',
          params: {id: props.bachelor.id,}
    });
  }

  const emit = defineEmits(['getItemDeleteId']);
  const getItemDeleteId = () => emit('getItemDeleteId', props.bachelor.id);

</script>

<template>
    <q-card flat bordered>
      <q-card-section horizontal @click="showDetail" class="cursor-pointer">
        <q-card-section class="q-pt-xs">
          <div v-show="false" class="text-overline">Proposée par entreprise</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{props.bachelor.name}}</div>
          <div class="text-caption text-grey">
            {{props.bachelor.description}}
          </div>

          <div class="text-overline">Proposé par : {{teacherName}}</div>

          <div>
            <q-chip v-for="tag in tagsItems" :key="tag">
              {{tag.name}}
            </q-chip>
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions align="around">
        <q-btn class="btn-edit" flat icon="edit" color="primary" :href="`/bachelors/${bachelor.id}/edit/`" />
        <q-btn class="btn-delete" flat icon="delete" color="red" @click="getItemDeleteId" />
      </q-card-actions>
    </q-card>
</template>

<style scoped lang="scss">

  .q-btn {
    min-width: 48%;
    max-width: 48%;
  }

  .btn-edit {
    background-color: #DDF7FC;
  }

  .btn-delete {
    background-color: #FBD6DB;
  }

  .q-card--bordered,
  .q-separator {
    border-color: $primary;
  }

  .q-card {
    min-width: 370px;

    .card__section {
      min-width: 200px;
    }
  }
</style>