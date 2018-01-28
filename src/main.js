import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'

Vue.prototype.$http = axios

export const bus = new Vue()

new Vue({
	el: '#app',
	template: '<App/>',
	components: { App }
})
