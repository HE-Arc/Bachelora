import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BachelorsView from "@/views/BachelorsView.vue";
import CreateBachelorView from "@/views/CreateBachelorView.vue";
import BachelorView from "@/views/BachelorView.vue";
import EditBachelorView from "@/views/EditBachelorView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ChosenBachelorView from "@/views/ChosenBachelorView.vue";
import LogoutView from "@/views/LogoutView.vue";

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
      component: LogoutView
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
      path: '/bachelors/:id',
      name: 'bachelors.detail',
      component: BachelorView
    },
    {
      path: '/bachelors/create',
      name: 'bachelors.create',
      component: CreateBachelorView
    },
    {
      path: '/bachelors/:id/edit',
      name: 'bachelors.edit',
      component: EditBachelorView
    },
    {
      path: '/chosen-bachelors',
      name: 'chosen-bachelors',
      component: ChosenBachelorView
    },
    {
      path: '/404',
      component: NotFoundView
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404'
    },
  ]
})

export default router
