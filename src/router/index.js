import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Bbs from '../components/home/BBS.vue'
import City from '../components/home/City.vue'
import People from '../components/home/People.vue'
import Province from '../components/home/Province.vue'

import Admin from '../components/admin/Admin.vue'
import Provincedata from '../components/admin/data/Province-data.vue'
import Welcome from '../components/admin/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/province', component: Province },
  { path: '/people', component: People },
  { path: '/city', component: City },
  { path: '/bbs', component: Bbs },
  {
    path: '/admin',
    component: Admin,
    meta: { requireAuth: true },
    redirect: 'welcome',
    children: [
      { path: '/welcome', component: Welcome, meta: { requireAuth: true } },
      { path: '/admin/province-data', component: Provincedata, meta: { requireAuth: true } }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (to.path === '/login') {
      next()
    } else {
      const token = localStorage.getItem('Authorization')
      if (token === null || token === '') {
        next('/login')
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
