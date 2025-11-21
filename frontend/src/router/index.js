import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Authentication Guard
  Router.beforeEach((to, from, next) => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null')
    
    // Check if route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!currentUser) {
        // Not logged in, redirect to login
        next('/login')
      } else {
        // Check if user has access to this view
        const requiredView = to.meta.view
        if (requiredView && currentUser.view !== requiredView) {
          // User doesn't have access to this view, redirect to their appropriate dashboard
          if (currentUser.view === 'executive') {
            next('/')
          } else if (currentUser.view === 'middle-management') {
            next('/middle-management/dashboard')
          } else if (currentUser.view === 'unit-personnel') {
            next('/unit-personnel/dashboard')
          }
        } else {
          next()
        }
      }
    } else if (to.path === '/login' && currentUser) {
      // Already logged in, redirect to appropriate dashboard
      if (currentUser.view === 'executive') {
        next('/')
      } else if (currentUser.view === 'middle-management') {
        next('/middle-management/dashboard')
      } else if (currentUser.view === 'unit-personnel') {
        next('/unit-personnel/dashboard')
      }
    } else {
      next()
    }
  })

  return Router
})
