import Vue from 'vue'
import Router from 'vue-router'
import {getTitile} from '@/utils/auth'
Vue.use(Router)

const router = new Router({
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      path: '/supermarket',
      name: 'supermarket',
      component: () => import('@/components/view/supermarket'),
      meta: { title: '超市' }
    },
    {
      path: '/cutList',
      name: 'cutList',
      component: () => import('@/components/view/cutList'),
      meta: { title: '同类产品列表' }
    },
    {
      path: '/cutDetails',
      name: 'cutDetails',
      component: () => import('@/components/view/cutDetails'),
      meta: { title: '产品详情' }
    },
    {
      path: '/messageDesc',
      name: 'messageDesc',
      component: () => import('@/components/view/messageDesc'),
      meta: { title: '资讯详情' }
    },
    {
      path: '/myBonus',
      name: 'myBonus',
      component: () => import('@/components/view/myBonus'),
      meta: { title: '我的积分' }
    },
    {
      path: '/myWallet',
      name: 'myWallet',
      component: () => import('@/components/view/myWallet'),
      meta: { title: '我的钱包' }
    },
    {
      path: '/siteMessage',
      name: 'siteMessage',
      component: () => import('@/components/view/siteMessage'),
      meta: { title: '站内信息详情' }
    },
    {
      path: '/activityList',
      name: 'activityList',
      component: () => import('@/components/view/activityList'),
      meta: { title: '活动产品列表' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    if (getTitile()) {
      document.title = getTitile()
    }
  }

  next()
})
export default router
