import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/dash',
    name: 'Dash',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dash.vue')
  },
  {
    path: '/note/:user/:id',
    props: true,
    name: 'Note',
    component: () => import(/* webpackChunkName: "about" */ '../views/Note.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "about" */ '../views/Create.vue')
  },
  {
    path: '/error/:code',
    props: true,
    name: 'Error',
    component: () => import(/* webpackChunkName: "about" */ '../views/Error.vue')
  },
  {
    path: '/:pathMatch(.*)*', redirect: '/error/404' 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
