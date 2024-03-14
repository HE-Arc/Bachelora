<script setup>
import Header from "@/components/NavBar.vue";
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Header />
      <main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
