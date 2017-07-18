<template lang="pug">
div
    h2.capitalize.layout-padding.text-secondary.bg-primary(style="padding-bottom: 16px") Events
    .layout-padding(v-if="events")
        q-search(v-model="search")
        .row.xs-gutter
        .col-xs-12.col-sm-6.col-md-3(v-for="(event,i) in events", :key="i")
            q-card(inline style="height: 300px" @click="$emit('selectEvent',event)").cursor-pointer.no-margin
            q-card-media(overlay-position="full").fit
                img(:src="event.image").fit
                q-card-title(slot="overlay") {{event.name}}
    .row(v-else style="height: calc(100vh - 200px)")
        .centered(style="margin: auto")
            h1 No Events
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
        events: {
            query: gql.queries.events,
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
