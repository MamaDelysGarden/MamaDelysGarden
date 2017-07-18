<template lang="pug">
  div(style="padding-bottom: 100px")
    q-btn(round color="secondary" big style="bottom: 18px; right: 18px;", @click="$router.push({name: 'admin-event', params: {id: 'add'}})").z-absolute.fixed-bottom-right
      q-icon(name="add")
    events(@selectEvent="selectEvent")

</template>

<script>
import gql from '../gql'
import {Alert} from 'quasar'

export default {
  name: 'admin-events',
  methods: {
    selectEvent(event) {

      let alert = Alert.create({
        enter: 'bounceInRight',
        leave: 'bounceOutRight',
        html: `Editing Event: ${event.name}`,
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
      
      this.$router.push({name: 'admin-event', params: {id: event.id}})
    }
  }
}
</script>
