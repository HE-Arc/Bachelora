import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BachelorsView from "@/views/BachelorsView.vue";
import CreateBachelorView from "@/views/CreateBachelorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/logout',
      name: 'logout',
      component: HomeView // TODO LogoutView
    },
    {
      path: '/account',
      name: 'account',
      component: HomeView // TODO AccountView
    },
    {
      path: '/bachelors',
      name: 'bachelors',
      component: BachelorsView
    },
    {
      path: '/bachelors/create',
      name: 'bachelors.create',
      component: CreateBachelorView
    },
    {
      path: '/bachelors/edit',
      name: 'bachelors.edit',
      component: HomeView // TODO ListBachelorEditView
    },
    {
      path: '/bachelors/delete',
      name: 'bachelors.delete',
      component: HomeView // TODO ListBachelorDeleteView
    },
    {
      path: '/chosen-bachelors',
      name: 'chosen-bachelors',
      component: HomeView // TODO ChosenBachelorView
    },
    {
      path: '/404',
      component: HomeView // TODO 404View
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404'
    },
  ]
})

export default router
