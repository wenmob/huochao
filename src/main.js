// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize.css/normalize.css'
/**
 * 引入vant
 */
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'

require('es6-promise').polyfill() // 解决老安卓系统兼容问题
Vue.use(Vant)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
