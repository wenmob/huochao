import Cookies from 'js-cookie'
export const browser = (function () {
  var u = window.navigator.userAgent
  var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  var wechat = !!u.match(/MicroMessenger/)
  var android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  var native = !!u.match(/&&/)
  var flag = wechat ? 'wechat' : native ? 'native' : ios ? 'ios' : 'android'
  return {
    userAgent: u,
    ios,
    wechat,
    android,
    native,
    flag
  }
})()

export { Cookies }
