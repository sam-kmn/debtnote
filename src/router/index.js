import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dash',
    name: 'Dash',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dash.vue')
  },
  {
    path: '/borrow',
    name: 'Borrow',
    component: () => import(/* webpackChunkName: "about" */ '../views/Borrow.vue')
  },
  {
    path: '/lend',
    name: 'Lend',
    component: () => import(/* webpackChunkName: "about" */ '../views/Lend.vue')
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import(/* webpackChunkName: "about" */ '../views/Friends.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
