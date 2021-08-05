import { createRouter, createWebHistory } from 'vue-router'
import List from '../views/List.vue'
import Detail from '@/views/event/Detail.vue'
import Edit from '@/views/event/Edit.vue'
import Layout from '@/views/event/Layout.vue'
import NotFound from '@/views/NotFound.vue'
import NetWorkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.js'
import GStore from '@/store'

const routes = [
  {
    path: '/',
    name: 'List',
    component: List,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/passenger/:id',
    name: 'Layout',
    props: true,
    component: Layout,
    // eslint-disable-next-line no-unused-vars
    beforeEnter: (to) => {
      return EventService.getPassenger(to.params.id)
        .then((response) => {
          GStore.passenger = response.data
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            return {
              name: '404Resource',
              params: { resource: 'event' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    children: [
      {
        path: '',
        name: 'Detail',
        component: Detail
      },
      {
        path: 'edit',
        name: 'Edit',
        props: true,
        component: Edit
      }
    ]
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetWorkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
