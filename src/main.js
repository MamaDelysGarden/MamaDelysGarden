// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar, * as All from 'quasar'
import router from './router'
import defaultClient from './apollo'
import VueApollo from 'vue-apollo'
import gql from './gql'
Vue.config.productionTip = false
Vue.use(VueApollo)
Vue.use(Quasar, {
  components: All,
  directives: All
})

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'
import 'quasar-extras/animate/bounceInRight.css'
import 'quasar-extras/animate/bounceOutRight.css'

const apolloProvider = new VueApollo({
  defaultClient
})

Quasar.start(() => {
  new Vue({
    el: '#q-app',
    router,
    apolloProvider,
    render: h => h(require('./App'))
  })
})
