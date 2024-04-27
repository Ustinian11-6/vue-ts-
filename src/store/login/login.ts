import { defineStore } from 'pinia'

import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/Cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
import useMainStore from '../main/main'

const useloginStore = defineStore('login', {
  state: () => ({
    token: '',
    userInfo: '',
    userMenus: ''
  }),
  getters: {},
  actions: {
    async loginactions(data: IAccount) {
      const loginResult = await accountLoginRequest(data)
      // console.log(datas)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      //加载部门、角色、菜单列表
      const MainStore = useMainStore()
      MainStore.fetchEntireDataAction()

      // 4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      const routers = mapMenusToRoutes(this.userMenus)
      routers.forEach((item) => {
        router.addRoute('main', item)
      })
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        //加载部门、角色、菜单列表
        const MainStore = useMainStore()
        MainStore.fetchEntireDataAction()

        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useloginStore
