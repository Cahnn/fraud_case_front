import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import {sendRequest} from './api/api'


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
// 全局挂载
Vue.prototype.$sendRequest = sendRequest

Vue.use(ElementUI);

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
