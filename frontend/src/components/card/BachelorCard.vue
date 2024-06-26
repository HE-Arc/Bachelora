<script setup>

  import {ref, defineProps, onMounted } from "vue";
  import router from "@/router/index.js";
  import BackendRequest from "@/request/request.js";
  import Cookie from "@/cookies/cookies.js";

  const props = defineProps({
    bachelor: {
      type: Object,
      required: true
    },
  });

  const bachelorOrientationsName = ref([]);
  const fetchOrientationsNames = async () => {
    for (const orientation of props.bachelor.orientations) {
      const orientationName = await BackendRequest.getOrientationName(orientation);
      bachelorOrientationsName.value.push(orientationName);
    }
  }


  const idUser = Cookie.getUser().id;

  const tagsItems = ref([]);
  const fetchTagsItems = async () => {
    for (const id of props.bachelor.tags) {
      const res = await BackendRequest.fetchTagById(id);
      tagsItems.value.push(res.data);
    }
  };

  const teacherName = ref('');
  const fetchTeacher = async () => {
    teacherName.value = await BackendRequest.getTeacherName(props.bachelor.teacher);
  };

  const showDetail = async () => {
    await router.push({
          name: 'bachelors.detail',
          params: {id: props.bachelor.id,}
    });
  }

  // Teacher configuration
  const id_teacher = ref(idUser);
  const emit = defineEmits(['getItemDeleteId']);
  const getItemDeleteId = () => emit('getItemDeleteId', props.bachelor.id);

  // Student configuration
  const is_student = ref(Cookie.getUser().user_type === 'student');

  const addToSelection = async () => {
    await BackendRequest.addBachelorToStudentSelection(idUser, props.bachelor.id, props.bachelor.name);
    await fetchSelectBachelor();
  };

  const removeFromSelection = async () => {
      await BackendRequest.removeBachelorToStudentSelection(idUser, props.bachelor.id, props.bachelor.name);
      await fetchSelectBachelor();
  }

  const choosen_bachelor = ref([]);
  const fetchSelectBachelor = async() => {
    const res = await BackendRequest.fetchAllBachelorsFromStudentById(idUser);
    choosen_bachelor.value = res.data.bachelors;
  };

  onMounted(() => {
    fetchTagsItems();
    fetchTeacher();

    if(Cookie.getUser().user_type === 'student')
    {
      fetchSelectBachelor();
    }

    fetchOrientationsNames();
  });

</script>

<template>
    <q-card flat bordered class="bachelor">
      <q-card-section horizontal @click="showDetail" class="cursor-pointer">
        <q-card-section class="q-pt-xs">
          <div v-show="false" class="text-overline">Proposée par entreprise</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{props.bachelor.name}}</div>
          <div class="text-caption text-grey">
            {{props.bachelor.description}}
          </div>

          <div class="text-overline">Proposé par : {{teacherName}}</div>

          <div class="text-overline">Orientation :
            <span v-for="(orientation, index) in bachelorOrientationsName" :key="orientation">
              {{ orientation }}<span v-if="index < bachelorOrientationsName.length - 1">, </span>
            </span>
          </div>

          <div>
            <q-chip v-for="tag in tagsItems" :key="tag">
              {{tag.name}}
            </q-chip>
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions align="around" v-show="!is_student && id_teacher === bachelor.teacher || is_student">
        <q-btn
            class="btn-edit"
            flat
            icon="edit"
            color="primary"
            v-show="!is_student"
            :href="`/bachelors/${bachelor.id}/edit/`"
        />

        <q-btn
            class="btn-delete"
            flat
            icon="delete"
            color="red" @click="getItemDeleteId"
            v-show="!is_student"
        />

        <q-btn
            class="btn-add-to-selection"
            v-show="is_student && !choosen_bachelor.includes(props.bachelor.id)"
            flat
            icon="add"
            color="primary"
            @click="addToSelection">
            <q-tooltip>
            Ajouter dans votre sélection
            </q-tooltip>
        </q-btn>

        <q-btn
            class="btn-remove-from-selection"
            v-show="is_student && choosen_bachelor.includes(props.bachelor.id)"
            flat
            icon="delete"
            color="red"
            @click="removeFromSelection">
            <q-tooltip>
            Retirere de votre sélection
            </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
</template>

<style scoped lang="scss">

  .q-btn {
    min-width: 48%;
    max-width: 48%;
  }

  .btn-edit,
  .btn-add-to-selection {
    background-color: #DDF7FC;
  }

  .btn-delete,
  .btn-remove-from-selection {
    background-color: #FBD6DB;
  }

  .q-card__actions--horiz > .q-btn-item + .q-btn-item,
  .q-card__actions--horiz > .q-btn-group + .q-btn-item,
  .q-card__actions--horiz > .q-btn-item + .q-btn-group{
    margin-left: 0;
  }

  .btn-add-to-selection,
  .btn-remove-from-selection {
    max-width: 100%;
    min-width: 100%;
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

  .bachelor {
    transition: transform .3s;
  }

  .bachelor:hover {
    transform: scale(1.05);
  }
</style>