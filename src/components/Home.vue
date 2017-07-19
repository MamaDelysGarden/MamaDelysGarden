<template lang="pug">
div(v-if="events")
    .window-height.row(style="padding-top: 64px")
        .m-a.text-center.text-itc
            div(style="font-size: 2rem").text-primary Mama Dely's
            div(style="font-size: 2rem").text-green Garden
            div(style="font-size: 2rem").text-primay cafe,resto &amp; function hall
    q-carousel.text-white(arrows dots infinite style="height: calc(50vh - 50px)", @slide="setSlide")
        template(v-for="(event,i) in events")
            .relative-position.fit(slot="slide").no-padding
                img(:key="i", :src="event.image", style="object-fit: cover").absolute.fit.block
                .text-center.layout-padding.absolute
                    h2 {{currentEvent.name}}
                    p {{currentEvent.description}}
        q-btn(color="primary" big style="bottom: 0; left: 0" ).absolute View Previous Events
    h1.text-center.text-itc(style="font-size: 150px") About
</template>

<script>

export default {
    name: 'home',
    inject: ['gql'],
    data() {
        return {
            slide: 0
        }
    },
    computed: {
        currentEvent() {
            return this.events[this.slide]
        }
    },
    methods: {
        setSlide(slide,direction) {
            this.slide = slide
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
        }
    }
}
</script>
