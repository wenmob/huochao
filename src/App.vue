<template>
  <div id="app">
    <keep-alive>
      <navigation v-if="keepAlive">
        <router-view v-if="isRouterAlive"/>
      </navigation>
    </keep-alive>
    <navigation v-if="!keepAlive">
        <router-view v-if="isRouterAlive"/>
    </navigation>
  </div>
</template>

<script>
import { setToken, removeTitile } from '@/utils/auth.js'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      keepAlive: true
    }
  },
  created () {
    // 是否缓存
    this.$navigation.on('back', (to, from) => {
      removeTitile()
      this.keepAlive = true
    })
  },
  methods: {
    // 页面刷新的用法
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  // 监听token，并保存token
  watch: {
    $route: {
      handler (val) {
        const { token, browser } = val.query
        if (browser) {
          window['huochao-is-browser'] = true
        }
        // Cookies.set("huochao-is-app", 1);
        // 如果是地址后面带了token 说明是原生端;
        if (token) {
          setToken(token)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f2f2f2;
}
</style>
