<script setup>

  import Title from "@/components/Title.vue";
  import BachelorCard from "@/components/card/BachelorCard.vue";
  import BackendRequest from "@/request/request.js";
  import {onBeforeUnmount, onMounted, ref} from "vue";
  import Cookie from "@/cookies/cookies.js";
  import router from "@/router/index.js";
  import {eventBus} from "@/eventBus.js";

  const choosen_bachelor = ref([]);

  if(Cookie.getUser() === null) {
    router.push({name: "login", query: { reconnect: true }});
  }
  else
  {
      const fetchSelectBachelor = async() => {
        choosen_bachelor.value = [];
        const res = await BackendRequest.fetchAllBachelorsFromStudentById(Cookie.getUser().id);

        for (const id of res.data.bachelors) {
          const bachelor = await BackendRequest.fetchBachelorById(id);
          choosen_bachelor.value.push(bachelor);
        }
      };

      onMounted(() => {
        fetchSelectBachelor();
        eventBus.on("update-chosen-bachelor", () => {
          fetchSelectBachelor();
        });
      });

      onBeforeUnmount(() => {
        eventBus.off("update-chosen-bachelor");
      });
  }

</script>

<template>
    <div>
      <section>
        <Title text="Ma sélection" />

        <ul id="bachelors" class="bachelors">
          <template v-if="choosen_bachelor.length === 0">
            <p>Aucun résultat trouvé.</p>
          </template>

          <template v-else>
            <li class="item-bachelor" v-for="bachelor in choosen_bachelor" :key="bachelor">
              <BachelorCard :bachelor="bachelor" />
            </li>
          </template>
        </ul>
      </section>
    </div>
</template>

<style scoped lang="scss">
  .bachelors {
      margin-top: 2rem;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
    }

</style>