// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';
import 'pl-table/themes/index.css'

import './utils/directives.js'
import './utils/customizeDialog.js'

import Video from 'video.js'
import 'video.js/dist/video-js.css'

import utils from './utils/utils.js'
import App from './App'
import router from './router'
import store from './store'
import vueAplayer from 'vue-aplayer';

Vue.prototype.$video = Video
Vue.prototype.$utils = utils
Vue.config.devtools = true;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(vueAplayer);
Vue.prototype.$layer = layer(Vue);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
