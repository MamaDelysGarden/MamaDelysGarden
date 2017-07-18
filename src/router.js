import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
Vue.component('products', load('Products'))
export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  mode: 'history',
  routes: [
    {
      path: '/',
      component: load('Index'),
      name: 'index',
      children: [
        {
          path: 'products',
          component: load('Products'),
          name: 'products'
        },
      ]
    },
    {
      path: '/admin',
      component: load('Admin'),
      children: [
        {
          path: '',
          redirect: {
            name: 'admin-products'
          }
        },
        {
          path: 'products',
          component: load('AdminProducts'),
          name: 'admin-products'
        },
        {
          path: 'products/:id',
          component: load('AdminProduct'),
          name: 'admin-product',
          props: true
        },
        {
          path: 'events',
          component: load('AdminEvents'),
          name: 'admin-events'
        },
      ]
    },



    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
