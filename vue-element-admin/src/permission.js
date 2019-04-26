//路由实例
import router from './router'
//vuex实例
import store from './store'
//ele组件实例
import { Message } from 'element-ui'
//进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import { getviewAuthority } from './api/user';

// NProgress.done NProgress.start 方法
//配置进度条是否需要spinner
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const userInfo = store.getters.userInfo;
      //判断是否获取用户信息
      if (userInfo.user_name) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const userInfo = await store.dispatch('user/getInfo')
          const getViewAuthority = await store.dispatch('user/getViewAuthoritys',userInfo.user_id);
          let generateRoutes = await store.dispatch('permission/generateRoutes',getViewAuthority)
              
          router.addRoutes(generateRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    //白名单   判断要去的页面是否在白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
