<template lang="pug">
  .q-app
    router-view
    q-ajax-bar
</template>

<script>
import gql from './gql'
export default {
  name: 'App',
  provide() {
    return {
      gql
    }
  }
}
</script>

<style></style>
