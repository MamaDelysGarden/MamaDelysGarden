<template lang="pug">
.layout-padding
    q-search(v-model="search")
    .row.xs-gutter(v-if="products")
      .col-xs-12.col-sm-6.col-md-3(v-for="(product,i) in products", :key="i")
        q-card(inline style="height: 300px" @click="$emit('selectProduct',product)").cursor-pointer.no-margin
          q-card-media(overlay-position="full").fit
            img(:src="product.image").fit
            q-card-title(slot="overlay") {{product.name}}
</template>

<script>
import gql from '../gql'
export default {
    name: 'products',
    data() {
        return {
            search: ''
        }
    },
    apollo: {
        products: {
            query: gql.queries.products,
            variables() {
                return {
                    search: this.search
                }
            },
            pollInterval: 1000
        }
    }
}
</script>
