import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
      meta: { title: '口子列表' }
    },
    {
      path: '/cutDetails',
      name: 'cutDetails',
      component: () => import('@/components/view/cutDetails'),
      meta: { title: '口子详情' }
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
    }
  ]
})
