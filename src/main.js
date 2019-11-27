import Vue from 'vue'
import App from './App.vue'
// import base from './common/base'
import axios from './common/axios'
import crud from './common/crud'
import until from './common/until'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store/index'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

// Vue.mixin(base)
Vue.prototype.$http = axios
Vue.prototype.$crud = crud
Vue.prototype.$until = until
Vue.prototype.$uploadImageUrl =  process.env.VUE_APP_IMAGE_UPLOAD_URL
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
