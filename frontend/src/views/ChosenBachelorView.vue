<script setup>

import Title from "@/components/Title.vue";
import BachelorCard from "@/components/card/BachelorCard.vue";



</script>

<template>
    <div>
      <section>
        <Title text="Ma sélection" />

        <ul id="bachelors" class="bachelors">
          <template v-if="displayBachelors.length === 0">
            <p>Aucun résultat trouvé.</p>
          </template>

          <template v-else>
            <li class="item-bachelor" v-for="bachelor in displayBachelors" :key="bachelor">
              <BachelorCard :bachelor="bachelor" @get-item-delete-id="getItemDeleteId"/>
            </li>
          </template>
        </ul>
      </section>
    </div>
</template>

<style scoped lang="scss">

</style>