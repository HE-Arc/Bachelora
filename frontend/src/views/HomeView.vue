<script setup>

import Title from "@/components/Title.vue";
import DevItem from "@/components/list/DevItem.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import Cookie from "@/cookies/cookies.js";

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

    <section class="text-center">
      <div>Favicon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
    </section>

    <section class="btns" v-if="Cookie.getToken() === null">
      <PrimaryButton link="login" text="Connexion" />
      <PrimaryButton link="register" text="Inscription" />
    </section>
  </div>
</template>

<style scoped lang="scss">
  @media only screen and (min-width: 1024px) {
    .btns {
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      .q-btn {
        min-width: 40%;
        max-width: 40%;
      }
    }
  }
</style>
