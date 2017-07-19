<template lang="pug">
div
    q-parallax.relative-position.row(style="height: calc(100vh - 74px)"
    src="https://scontent.fmnl4-1.fna.fbcdn.net/v/t31.0-8/18595645_298509983938729_3080520903457580186_o.jpg?_nc_eui2=v1%3AAeEM6xOJJBfB1p-MZVCxhPfkGqJu-hjeEQNIWvvJLiN7rB7zlfx1lfCgb4mN253TQFaZPd_GxwCrAAhSy3rjA17qZyy3d5VbVUHxNzBcSH8SJA&oh=bceae61e5d90e2c2e756367e1cd4ba01&oe=59F1B6E5")
        .absolute.text-center.text-itc.text-secondary(style="margin: auto; z-index: 1")
            div(style="font-size: 10rem") Mama Dely's
            div(style="font-size: 6em") Garden
            div(style="font-size: 4rem") cafe,resto &amp; function hall
        .absolute.fit(style="background: rgba(0,0,0,0.45);")
    div(style="min-height: 100vh").bg-secondary
        q-carousel.text-white(arrows dots infinite style="height: 50vh" @slide="setSlide")
            template(v-for="(event,i) in events")
                .relative-position.fit(slot="slide").no-padding
                    img(:key="i", :src="event.image", style="object-fit: cover").absolute.fit.block
                    .absolute.fit(style="background: rgba(0,0,0,0.45);")
                    .text-center.layout-padding.absolute
                        h2 {{currentEvent.name}}
                        p {{currentEvent.description}}
            q-btn(color="primary" big style="bottom: 0; left: 0" @click="$router.push({name: 'events'})").absolute View More Events
        h1.text-center.text-itc(style="font-size: 150px").text-primary Events
        p.text-center.text-white(style="width: 300px; margin: auto") Mama Dely's has great services and events for their customers, they also do caterings and other kinds of parties like debuts.
    div(style="min-height: 100vh").bg-secondary
        q-carousel.text-white(arrows dots infinite style="height: 50vh" @slide="setSlideProduct")
            template(v-for="(product,i) in products")
                .relative-position.fit(slot="slide").no-padding
                    img(:key="i", :src="product.image", style="object-fit: cover").absolute.fit.block
                    .absolute.fit(style="background: rgba(0,0,0,0.45);")
                    .text-center.layout-padding.absolute
                        h2 {{currentProduct.name}}
                        p {{currentProduct.description}}
            q-btn(color="primary" big style="bottom: 0; left: 0" @click="$router.push({name: 'products'})").absolute View More Products
        h1.text-center.text-itc(style="font-size: 150px").text-primary Products
        p.text-center.text-white(style="width: 300px; margin: auto") Mama Dely's has great products and will serve you right. Check out there delicious foods there.
</template>

<script>

export default {
    name: 'home',
    inject: ['gql'],
    data() {
        return {
            slide: 0,
            slideProduct: 0
        }
    },
    computed: {
        currentEvent() {
            return this.events[this.slide]
        },
        currentProduct() {
            return this.products[this.slideProduct]
        },
    },
    methods: {
        setSlide(slide,direction) {
            this.slide = slide
        },
        setSlideProduct(slide,direction) {
            this.slideProduct = slide
        }
    },
    apollo: {
        events: {
            query() {
                return this.gql.queries.events
            },
            variables: {
                first: 3
            }
        },
        products: {
            query() {
                return this.gql.queries.products
            },
            variables: {
                first: 3
            }
        },
    }
}
</script>
