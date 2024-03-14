import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";

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
      component: LoginView // TODO LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: HomeView // TODO RegisterView
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
      path: '/list-bachelors',
      name: 'list-bachelors',
      component: HomeView // TODO ListBachelorView
    },
    {
      path: '/list-bachelors/create',
      name: 'list-bachelors.create',
      component: HomeView // TODO ListBachelorCreateView
    },
    {
      path: '/list-bachelors/edit',
      name: 'list-bachelors.edit',
      component: HomeView // TODO ListBachelorEditView
    },
    {
      path: '/list-bachelors/delete',
      name: 'list-bachelors.delete',
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
