import { sendMessage } from "@/utils/hybrid";
export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          activeTitle: ""
        };
      },
      methods: {
        openUrl(url) {
          if (window["huochao-is-browser"]) {
            window.location.href = url;
          } else {
            sendMessage("open_url", { url });
          }
        }
      }
    });
  }
};
