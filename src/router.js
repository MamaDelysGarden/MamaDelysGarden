import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
Vue.component('products', load('Products'))
Vue.component('events', load('Events'))

Vue.component('grid',load('Grid'))

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: load('Index'),
      children: [
        {
          path: '',
          component: load('Home'),
          name: 'index'
        },
        {
          path: 'products',
          component: load('Products'),
          name: 'products'
        },
        {
          path: 'events',
          component: load('Events'),
          name: 'events'
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
          path: 'events/:id',
          component: load('AdminEvent'),
          name: 'admin-event',
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
