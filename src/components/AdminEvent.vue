<template lang="pug">
  .layout-padding(v-if="ready" style="padding-bottom: 100px")
    q-btn(round color="secondary" big loader, :disabled="notChanged", @click="saveChanges" style="bottom: 18px; right: 18px;").fixed-bottom-right.z-absolute
      q-icon(name="save")
    q-btn(round color="negative" v-if="!isAdd" big loader @click="deleteProduct" style="bottom: 18px; left: 18px;").fixed-bottom-left.z-absolute
      q-icon(name="delete")
    h4.ellipsis {{product ? product.name : 'Add Product'}}
    q-input(v-model="editProduct.name" float-label="Name", :readonly="loading")
    q-input(v-model="editProduct.description" type="textarea" float-label="Description", :readonly="loading")
    .text-center
      img(:src="product ? product.image : editProduct.image" style="height: 300px; width: 300px")
    q-input(v-model="editProduct.image" float-label="Image", :readonly="loading")
</template>

<script>
import gql from '../gql'
import { Toast } from 'quasar'
export default {
  name: 'admin-product',
  props: ['id'],
  data() {
    return {
      editProduct: {
        name: '',
        description: '',
        image: ''
      },
      loading: 0
    }
  },
  computed: {
    ready() {
      return !this.loading && (this.product || this.editProduct)
    },
    notChanged() {
      if (!this.product) return
      return Object.keys(this.editProduct).every(key => this.editProduct[key] === this.product[key])
    },
    isAdd() {
      return this.id === 'add' && !this.product
    }
  },
  methods: {
    async deleteProduct(e, done) {
      await this.$apollo.mutate({
        mutation: gql.mutations.deleteEvent,
        variables: {
          id: this.product.id
        }
      })
      await this.$apollo.queries.event.refetch()

      done()
      Toast.create.positive({
        html: 'Eve t Deleted'
      })
      this.$router.push({ name: 'admin-events' })

    },
    async saveChanges(e, done) {
      try {
        await this.$apollo.mutate({
          mutation: gql.mutations[this.isAdd ? 'createEvent' : 'updateEvent'],
          variables: { ...this.editEvent },
        })

        this.loading = 1

        await this.$apollo.queries.event.refetch()

        done()
        Toast.create.positive({
          html: this.isAdd ? 'Event Added' : 'Event Updated'
        })
        this.loading = 0
      }
      catch (e) {
        Toast.create.negative({
          html: this.isAdd ? 'Error Adding Product' : 'Error Updating Product'
        })
      }
      this.$router.push({ name: 'admin-products' })


    }
  },
  apollo: {
    product: {
      query: gql.queries.product,
      loadingKey: 'loading',
      variables() {
        return {
          id: this.id
        }
      },
      result({ data: { product } }) {
        this.editProduct = { ...product }
      },
      skip() {
        return this.isAdd
      }
    }
  }
}
</script>
