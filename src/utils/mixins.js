export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          activeTitle: ''
        }
      }
    })
  }
}
