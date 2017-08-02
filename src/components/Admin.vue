<template lang="pug">
  q-layout
    q-toolbar(slot="header" reveal)
      q-toolbar-title Admin Mama Dely
        span(slot="subtitle" v-if="currentUser") {{currentUser.email}}
      q-btn(icon="exit_to_app" loader color="secondary" @click="logout" v-if="currentUser" style="width: 150px") Logout
    q-tabs(slot="navigation" align="center")
      q-route-tab(slot="title" v-for="({name,icon,label},i) in routes", :key="i", :label="label", :icon="icon", :to="{name}")

    router-view(v-if="currentUser && !loading")
    .layout-padding(v-else)
      q-card(style="width: 400px; margin: 0 auto;")
        q-toolbar
          q-toolbar-title Login/Register Admin        
        q-card-main
          q-field(icon="email")
            q-input(v-model="user.email" float-label="Email")
          q-field(icon="vpn_key")
            q-input(v-model="user.password" float-label="Password" type="password")
        .row.justify-around(style="padding-bottom: 16px")
          q-btn(loader @click="login" color="secondary" style="width: 150px") Login
          q-btn(loader @click="register" color="secondary" style="width: 150px") Register

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
    async register(e, done) {
      try {
        await this.$apollo.mutate({
          mutation: this.gql.mutations.createUser,
          variables: this.user,
        })
        await this.login(e, done)
      } catch (e) {

      } finally {
        done()
      }
    }
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
