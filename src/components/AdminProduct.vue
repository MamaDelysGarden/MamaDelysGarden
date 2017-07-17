<template lang="pug">
  .layout-padding(v-if="product")
    .row.xs-gutter.justify-between.items-center
      .col-auto
        h1 {{product.name}}
      .col-auto
        q-btn(round color="secondary", :disabled="notChanged", @click="saveChanges")
          q-icon(name="save")
    q-input(v-model="editProduct.name" float-label="Name")
    q-input(v-model="editProduct.description" type="textarea" float-label="Description")
    q-input(v-model="editProduct.image" float-label="Image")
</template>

<script>
import gql from '../gql'
export default {
  name: 'admin-product',
  props: ['id'],
  data() {
    return {
      editProduct: null
    }
  },
  computed: {
    notChanged() {
      return Object.keys(this.editProduct).every(key => this.editProduct[key] === this.product[key])
    }
  },
  methods: {
    async saveChanges() {
      await this.$apollo.mutate({
        mutation: gql.mutations.updateProduct,
        variables: {...this.editProduct},
      })
      this.$apollo.queries.product.refetch()
    }
  },
  apollo: {
    product: {
      query: gql.queries.product,
      variables() {
        return {
          id: this.id
        }
      },
      result({data: {product}}) {
        this.editProduct = {...product}
      },
      subscribeToMore: {
        document: gql.subscriptions.productSubscription,
        variables() {
          return {
            id: this.id
          }
        },
        updateQuery(...args) {
          console.log(args)
        }
      }
    }
  }
}
</script>
