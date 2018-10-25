import { sendMessage } from '@/utils/hybrid'
export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          activeTitle: ''
        }
      },
      methods: {
        openUrl (url) {
          if (window['huochao-is-app']) {
            sendMessage('open_url', { url })
          } else {
            window.location.href = url
          }
        }
      }
    })
  }
}
