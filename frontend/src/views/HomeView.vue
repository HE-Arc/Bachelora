<script setup>

import Title from "@/components/Title.vue";
import DevItem from "@/components/list/DevItem.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

const devsTeam = [
  {
    name: "Stéphane Oguey",
  },
  {
    name: "Loïc Santschi",
  },
  {
    name: "Miranda Fleury"
  }
];
</script>

<template>
  <div>
    <section>
      <Title text="Qu'est-ce que Bachelora ?" />

      <p class="text-justify">Bachelora est une application permettant de stocker les différents travaux de bachelor
        proposés pour les étudiants de la filière Informatiques et systèmes de communications (ISC). <br>
        Les enseignants peuvent saisir, modifier ou supprimer des travaux de bachelor tandis que les étudiants peuvent
        les consulter.</p>
    </section>

    <section>
      <Title text="Notre équipe" />
      <q-list>
        <DevItem v-for="(dev, index) in devsTeam" :key="index" :name="dev.name" />
      </q-list>
    </section>

    <section>
      <PrimaryButton link="login" text="Connexion" />
      <PrimaryButton link="register" text="Inscription" />
    </section>
  </div>
</template>
