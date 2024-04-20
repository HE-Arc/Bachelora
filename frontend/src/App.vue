<script setup>
import NavBar from "@/components/NavBar.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const showScrollButton = ref(false);

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 100;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

</script>

<template>
  <q-layout view="lHh LpR lFf" style="min-height: 90vh">
    <NavBar />
    <q-page-container style="padding-top: 25px;">
      <main>
        <div class="wrapper">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>

      <q-page-sticky position="bottom-right" :offset="[18, 18]" v-show="showScrollButton">
        <q-btn fab icon="expand_less" color="primary" @click="scrollToTop" />
      </q-page-sticky>
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

  .wrapper
  {
    max-width: 980px;
    margin: 0 auto;
  }

  #app {
    grid-template-columns: 1fr;
  }
</style>
