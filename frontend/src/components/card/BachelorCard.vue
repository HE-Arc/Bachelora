<script setup>

</script>

<template>
    <q-card flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Proposée par entreprise</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Titre</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>

          <div class="text-overline">Enseignat ayant entré le travail</div>

          <div>
            <q-chip v-for="item in 5" :key="item">
              IA
            </q-chip>
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions align="around">
        <q-btn class="btn-edit" flat icon="edit" color="primary" />
        <q-btn class="btn-delete" flat icon="delete" color="red" />
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
</style>