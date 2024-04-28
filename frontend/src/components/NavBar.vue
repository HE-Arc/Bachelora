<script setup>
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
  import Cookie from "@/cookies/cookies.js";
  import {ACCESS} from "@/router/access.js";

  import { eventBus } from "@/eventBus.js";

  const miniState = ref(true);
  const leftDrawerOpen = ref(false);
  const menuList = [
    {
      icon: 'home',
      name: 'home',
      label: 'Accueil',
      separator: true,
      access: ACCESS.ALL
    },
    {
      icon: 'login',
      name: 'login',
      label: 'Connexion',
      separator: false,
      access: ACCESS.NOT_CONNECT
    },
    {
      icon: 'app_registration',
      name: 'register',
      label: 'Inscription',
      separator: true,
      access: ACCESS.NOT_CONNECT
    },
    {
      icon: 'school',
      name: 'bachelors',
      label: 'Liste des travaux de bachelor',
      separator: false,
      access: ACCESS.USERS
    },
    {
      icon: 'star',
      name: 'chosen-bachelors',
      label: 'Ma sélection',
      separator: true,
      access: ACCESS.STUDENT
    },
    {
      icon: 'logout',
      name: 'logout',
      label: 'Déconnexion',
      separator: false,
      access: ACCESS.USERS
    },
  ];

  const access_level = ref([]);
  const updateAccessLevel = () => {
    access_level.value = [ACCESS.ALL];
    if (Cookie.getToken() === null) {
      access_level.value.push(ACCESS.NOT_CONNECT);
    } else {
      access_level.value.push(ACCESS.USERS);
      if (Cookie.getUser().user_type === "student") {
        access_level.value.push(ACCESS.STUDENT);
      }
    }
  };

  updateAccessLevel();

  const filteredMenuList = computed(() => {
    return menuList.filter((item => access_level.value.includes(item.access)));
  });

  onMounted(() => {
    eventBus.on("update-access", () => {
      updateAccessLevel();
    });
  });

  onBeforeUnmount(() => {
    eventBus.off("update-access");
  });

</script>

<template>
  <q-header elevated class="header">
    <q-toolbar>
      <q-btn
      flat
      dense
      round
      @click="leftDrawerOpen = !leftDrawerOpen"
      aria-label="Menu"
      icon="menu"
      />
      <q-toolbar-title class="title ubuntu-bold">
        <router-link :to="{ name: 'home'}" class="ubuntu-bold text-white">Bachelora</router-link>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-drawer
  v-model="leftDrawerOpen"
  v-show="leftDrawerOpen"

  :mini="miniState"
  @mouseover="miniState = false"
  @mouseout="miniState = true"

  :breakpoint="500"
  bordered
  >
    <q-scroll-area class="fit">
      <q-list>
        <q-item-label header>Bachelora</q-item-label>

        <template v-for="(menuItem, index) in filteredMenuList" :key="index">
          <router-link :to="{ name: menuItem.name }">
            <q-item clickable :active="$route.name === menuItem.name" :class="{ active : $route.name === menuItem.name }" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"></q-icon>
              </q-item-section>

              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </router-link>

          <q-separator :key="'sep' + index"  v-if="menuItem.separator"></q-separator>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>

</template>

<style scoped lang="scss">
  .header {
    background-color: $secondary;
    text-align: center;

    .title {
      font-weight: bold;
    }
  }

  .active {
    background-color: aliceblue;
  }
</style>