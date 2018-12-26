import { browser, Cookies } from './index'
// import Cookies from "js-cookie";
// const NativeKey = "xlg-native-object";

export function sendMessage (action, data = {}, callback) {
  if (callback) {
    window[`fn_${action}`] = callback
  }
  if (browser.ios) {
    return window.webkit.messageHandlers[action].postMessage(data)
  }
  if (browser.android) {
    return window.tb_android[action](JSON.stringify(data))
  }
}

// export function getNativeObject() {
//   const ua = window.navigator.userAgent;
//   const [x, jsonStr] = ua.split("&&");
//   return jsonStr ? JSON.parse(jsonStr) : {};
// }
