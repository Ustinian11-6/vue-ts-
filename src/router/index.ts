import { createRouter, createWebHashHistory } from 'vue-router'

import { localCache } from '@/utils/Cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  if (to.path === '/main') {
    return firstMenu?.url
  }
})

// 导航守卫

export default router
