<template lang="pug">
  admin-editor(:id="id", :edit="product", label="Product")
</template>

<script>
import { Toast } from 'quasar'
export default {
  name: 'admin-product',
  props: ['id'],
  data() {
    return {
      product: {
        name: '',
        description: '',
        image: ''
      },
    }
  },
}
</script>
