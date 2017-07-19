<template lang="pug">

  q-layout(view="lhr LpR FFF" reveal)
    q-toolbar(color="secondary" slot="header" reveal)
      q-toolbar-title.text-itc(style="font-size: 56px") Mama Dely's Garden
      q-btn(flat v-for="({name,icon},i) in routes", :key="i" round small @click="$router.push({name})")
        q-icon(:name="icon")
    div(style="min-width: 100vh")
      router-view

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
