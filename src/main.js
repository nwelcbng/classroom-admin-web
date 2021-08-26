import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './base.css' //引入公共样式
import './iconfont/iconfont.css' //引入图标字体库
import './plugins/element.js'
import {Button,Input} from 'element-ui'


Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Input);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
