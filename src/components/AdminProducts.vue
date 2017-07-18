<template lang="pug">

  div(style="padding: 8px; padding-bottom: 100px")
    q-btn(round color="secondary" big style="bottom: 18px; right: 18px;", @click="$router.push({name: 'admin-product', params: {id: 'add'}})").z-absolute.fixed-bottom-right
      q-icon(name="add")
    products(@selectProduct="selectProduct")
</template>

<script>
import gql from '../gql'
import {Alert} from 'quasar'
import 'quasar-extras/animate/bounceInRight.css'
import 'quasar-extras/animate/bounceOutRight.css'
export default {
  name: 'admin-products',
  methods: {
    selectProduct(product) {

      let alert = Alert.create({
        enter: 'bounceInRight',
        leave: 'bounceOutRight',
        html: `Editing Product: ${product.name}`,
        position: 'top-right',
        color: 'positive',
        icon: 'edit',
        dismissable: false
      })
      let timeOut

      timeOut = setTimeout(() => {
          alert.dismiss()
          clearInterval(timeOut)
      },3000)
      
      this.$router.push({name: 'admin-product', params: {id: product.id}})
    }
  }
}
</script>
