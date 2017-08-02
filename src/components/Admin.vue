<template lang="pug">
  q-layout
    q-toolbar(slot="header" reveal)
      q-toolbar-title Admin Mama Dely
      q-btn(icon="exit_to_app" loader color="secondary" @click="logout" v-if="currentUser")
    q-tabs(slot="navigation" align="center")
      q-route-tab(slot="title" v-for="({name,icon,label},i) in routes", :key="i", :label="label", :icon="icon", :to="{name}")

    router-view(v-if="currentUser && !loading && ($route.path !== '/admin/' || $route.path !== '/admin')")
    .layout-padding.row(v-else-if="($route.path === '/admin/' || $route.path === '/admin')")
      .m-a.text-center
        h1 Hello Admin
    .layout-padding(v-else)
      q-field(icon="email")
        q-input(v-model="user.email" float-label="Email")
      q-field(icon="vpn_key")
        q-input(v-model="user.password" float-label="Password" type="password")
      .text-center
        q-btn(loader @click="login" color="primary" style="width: 150px") Login
</template>

<script>
export default {
  name: 'dashboard',
  inject: ['gql'],
  data() {
    return {
      currentUser: null,
      user: {
        email: '',
        password: ''
      },
      loading: 0,
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
  },
  methods: {
    async login(e, done) {
      try {
        let { data } = await this.$apollo.mutate({
          mutation: this.gql.mutations.signInUser,
          variables: this.user
        })

        localStorage.setItem('token', data.user.token)
        await this.$apollo.queries.currentUser.refetch()
        this.$router.push({ name: 'admin-products' })
      } catch (e) {

      } finally {
        done()
      }
    },
    async logout(e, done) {
      try {
        localStorage.removeItem('token')
        await this.$apollo.queries.currentUser.refetch()
      } catch (e) {

      } finally {
        done()
      }
    },
  },
  apollo: {
    currentUser() {
      console.log(this.gql)
      return {
        loadingKey: 'loading',
        query: this.gql.queries.currentUser,
        pollInterval: 1000
      }
    }
  },
}
</script>
