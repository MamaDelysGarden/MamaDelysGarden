<template lang="pug">
div
    h2.capitalize.layout-padding.text-secondary.bg-primary.no-margin(style="padding-bottom: 16px") Products
    .layout-padding(v-if="products")
        q-search(v-model="search")
        .row.xs-gutter
            .col-xs-12.col-sm-6.col-md-3(v-for="(product,i) in products", :key="i")
                q-card(inline style="height: 300px" @click="$emit('selectProduct',product)").cursor-pointer.no-margin
                    q-card-media(overlay-position="full").fit
                        img(:src="product.image").fit
                        q-card-title(slot="overlay") {{product.name}}
    .row(v-else style="height: calc(100vh - 200px)")
        .centered(style="margin: auto")
            h1 No Products
</template>

<script>

export default {
    name: 'products',
    inject: ['gql'],
    data() {
        return {
            search: ''
        }
    },
    apollo: {
        products: {
            query() {
                return this.gql.queries.products
            },
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
