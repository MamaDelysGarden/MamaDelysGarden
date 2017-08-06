<template lang="pug">
div
    q-parallax.row(style="height: calc(100vh - 56px)"
    src="https://scontent.fmnl8-1.fna.fbcdn.net/v/t1.0-9/18581691_300400793749648_5199578297950002422_n.jpg?_nc_eui2=v1%3AAeF19yiT0I3nbaP2wWZt--F2ylnqjiSN9TPLYD_RQYqMTOKHNJpsENP_7PW6ABsClEJ6OdXrL1peAw5PKSX3eE-RY42lAgti6JbRMvrkV8f2-A&oh=3215f2e0fbed79ebc14cbaaf3ae7d4fc&oe=5A31C873")
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
            q-btn(color="primary" big style="bottom: 0; left: 0", @click="$router.push({name: 'products'})").absolute View Menus Gallery
        h1.text-center.text-itc(style="font-size: 150px").text-primary Menu
        p.text-center.text-white(style="width: 300px; margin: auto") Mama Dely's has great menus. Check out our delicious foods here.
        .text-center
          q-btn(color="primary",  @click="$router.push({name: 'products'})") Check it out here
        h1.text-center.text-itc(style="font-size: 150px").text-primary About Us
        q-layout
            q-fixed-position(corner='center', :offset='[90, 90]')
                q-card-media.row
                    img.center(src='~assets/19030514_309067469549647_2582662800476357288_n.jpg' style="height :600px; width :500px")
                    h2.text-center.text-white(style="width: 300px; margin: auto") History
                        p.text-white(style="width: 300px; margin: auto") Mama Dely’s Garden is a newly opened restaurant located at 0013MLA. East Road Brgy. Pagasa 1940 Binangonan it was once known as Delys Pancit in 1975  and became a best selling pancit in Angono. Now it was re-open as Mama Delys Garden and Cafe owned by Mrs. Me-an Bautista Managed by Mrs. Jennifer Bautista this past days only their old customer come to their restaurant.
        .layout-padding.text-center
          h1.text-itc(style="font-size: 150px").text-primary Contact Location
          h6.text-itc(style="font-size: 50px").text-green Mama Dely's Garden
          .text-white(style="width: 300px; margin: auto")
            p Opens at: Monday to Thursday 12:00 PM to 12:00 AM
            p Friday 12:00 PM to 1:00 AM
            p Saturday 10:00 AM to 1:00 AM
            p Sunday 10:00 AM to 12:00 AM
            br
            p Cellphone no. : 0975 668 6847
            p Visit us at: www.MamaDelysGarden
            p Located at: 0013 Mla. East Road Brgy. Pagasa 1940 Binangonan
</template>

<script>

export default {
    name: 'home',
    inject: ['gql'],
    data() {
        return {
            slide: 0,
            slideProduct: 0,
            category: 'STARTER',
          categories: [
            {
              label: "Starter",
              value: "STARTER"
            },
            {
              label: "Rice Meal",
              value: "RICE_MEAL"
            },
            {
              label: "Frappe",
              value: "FRAPPE"
            },
            {
              label: "Drinks",
              value: "DRINKS"
            },
            {
              label: "Sandwich",
              value: "SANDWICH"
            },
            {
              label: "Family Group",
              value: "FAMILY_GROUP"
            }
          ],
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

<style lang="stylus">
  .menus > .q-btn
    margin 0 10px
</style>
