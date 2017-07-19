<template lang="pug">
  admin-editor(:id="id", :edit="event", label="Event")
</template>

<script>

import { Toast } from 'quasar'
export default {
  name: 'admin-event',
  props: ['id'],
  data() {
    return {
      event: {
        name: '',
        description: '',
        image:  ''
      }
    }
  }
}
</script>
