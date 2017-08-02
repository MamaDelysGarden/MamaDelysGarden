<template lang="pug">
  q-layout
    q-toolbar(slot="header" reveal)
      q-toolbar-title Admin Mama Dely
      q-btn(icon="exit_to_app" loader color="secondary" @click="logout" v-if="currentUser")
    q-tabs(slot="navigation" align="center")
      q-route-tab(slot="title" v-for="({name,icon,label},i) in routes", :key="i", :label="label", :icon="icon", :to="{name}")

    router-view(v-if="!currentUser && loading")
    .layout-padding(v-else)
      q-field(icon="email")
        q-input(v-model="user.email")
      q-field(icon="vpn_key")
        q-input(v-model="user.password")
      .text-center
        q-btn(loader @click="login" color="primary" style="width: 150px") Login
</template>

<script>
export default {
  name: 'dashboard',
  inject: ['gql'],
  methods: {
    async login(e, done) {
      try {
        let { data } = await this.$apollo.mutate({
          mutation: this.gql.mutations.signInUser,
          variables: this.user
        })
        localStorage.setItem('token', data.token)
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
    apollo: {
      currentUser() {
        return {
          loadingKey: 'loading',
          query: this.gql.queries.currentUser
        }
      }
    },
    data() {
      return {
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
    }
  }
}
</script>
