<template lang="pug">
  q-layout
    q-toolbar(slot="header" reveal)
      q-toolbar-title Admin Mama Dely
    q-tabs(slot="navigation" align="center")
      q-route-tab(slot="title" v-for="({name,icon,label},i) in routes", :key="i", :label="label", :icon="icon", :to="{name}")

    router-view

</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {

      routes: [
        {
          name: 'admin-products',
          label: 'Products',
          icon: 'shopping_basket'
        },
        {
          name: 'admin-events',
          label: 'Events',
          icon: 'event'
        },
      ]
    }
  }
}
</script>
