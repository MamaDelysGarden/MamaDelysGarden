<template lang="pug">
  div(style="padding-bottom: 100px")
    q-btn(round color="secondary" big style="bottom: 18px; right: 18px;", @click="$router.push({name: 'admin-event', params: {id: 'add'}})").z-absolute.fixed-bottom-right
      q-icon(name="add")
    events(@select="select")

</template>

<script>
import admin from './admin'

export default {
  name: 'admin-events',
  mixins: [admin],
  data() {
    return {
      label: 'Event'
    }
  }
}
</script>