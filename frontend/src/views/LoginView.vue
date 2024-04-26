<script setup>

import Title from "@/components/Title.vue";
import LoginForm from "@/components/form/LoginForm.vue";
import {useRoute} from "vue-router";
import Notification from "@/notifications/notifications.js";

const route = useRoute();
const queryParams = route.query;

if(queryParams.reconnect)
{
  Notification.warning("Votre session a expiré. Veuillez vous reconnectez pour continuer.");
}

</script>

<template>

  <section>
    <Title text="Connexion" />
    <LoginForm />
  </section>
</template>

<style scoped lang="scss">

</style>