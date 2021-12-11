import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/bootstrap-vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

Vue.mixin({
  methods: {
    toast: function() {
      return {
        success: (message = 'Success!') =>  {
          this.$bvToast.toast(message, {
            autoHideDelay: 2000,
            variant: 'success',
            noCloseButton: true
          })
        },
        failure: (message = 'Failure!') =>  {
          this.$bvToast.toast(message, {
            autoHideDelay: 2000,
            variant: 'danger',
            noCloseButton: true
          })
        }
      }
    },
  }
})