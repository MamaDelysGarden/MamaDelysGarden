<template lang="pug">
  q-layout(view="lHh LpR FFF")
    div(style="min-width: 100vh")
      router-view
    q-toolbar(color="secondary" slot="footer")
        q-toolbar-title Mama Dely's Garden
        q-btn(flat v-for="({name,icon},i) in routes", :key="i" round small @click="$router.push({name})")
          q-icon(:name="icon")
</template>

<script>

export default {
  name: 'index',
  data() {
    return {
      routes: [
        {
          name: 'index',
          icon: 'home'
        },
        {
          name: 'products',
          icon: 'shopping_cart'
        },
        {
          name: 'events',
          icon: 'event'
        },
      ],
    }
  },
}
</script>
