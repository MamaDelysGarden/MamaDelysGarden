<template lang="pug">

  q-layout(view="lhr LpR FFF" reveal)
    q-toolbar(color="secondary" slot="header" reveal)
      q-toolbar-title.text-primary.text-itc(style="font-size: 56px") Mama Dely's Garden
      q-btn(flat v-for="({name,icon},i) in routes", :key="i" round small @click="$router.push({name})")
        q-icon(:name="icon")

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
          icon: 'restaurant_menu'
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
