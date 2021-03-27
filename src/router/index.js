import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Bbs from '../views/home/BBS.vue'
import City from '../views/home/City.vue'
import People from '../views/home/People.vue'
import Province from '../views/home/Province.vue'

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
  { path: '/bbs', component: Bbs }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 解决跳转下一个页面底部的方法
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
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
