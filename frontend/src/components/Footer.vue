<script setup>

</script>

<template>
  <q-footer class="footer">
    <q-toolbar>
      <q-toolbar-title class="text-center footer">
        &copy; 2024 - <router-link to="https://he-arc.ch">Haute Ecole Arc.</router-link> Tous droits réservés
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<style scoped lang="scss">
.footer {
    font-size: 0.75rem;
    background-color: transparent;

    bottom: 0;

    color: $primary;

    a {

      padding: 0;
      text-decoration: underline;
    }
  }
</style>