<script setup>

</script>

<template>
  <!--<div class="q-pa-md row items-start q-gutter-md">-->
    <q-card :key="bachelor" class="my-card" flat bordered >
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Proposée par entreprise</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Titre</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>

          <div class="text-overline">Enseignat ayant entré le travail</div>

          <div>
            <q-chip v-for="item in 5" color="secondary" :key="item" text-color="white">
              IA
            </q-chip>
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions align="around">
        <q-btn flat icon="edit" color="primary"/>
        <q-btn flat round icon="delete" color="red" />
      </q-card-actions>
    </q-card>
  <!--</div>-->
</template>

<style scoped lang="scss">

</style>