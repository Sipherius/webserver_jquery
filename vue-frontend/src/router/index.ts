import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('../views/TodosView.vue'),
    },
    {
      path: '/todos/create',
      name: 'todosCreate',
      component: () => import('../views/TodoCreateView.vue'),
    },
    {
      path: '/todos/edit/:id',
      name: 'todosEdit',
      props: true,
      component: () => import('../views/TodoEditView.vue'),
    },
    {
      path: '/todos/delete/:id',
      name: 'todosDelete',
      props: true,
      component: () => import('../views/TodoDeleteView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    }
  ]
})

export default router
