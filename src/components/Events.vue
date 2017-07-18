<template lang="pug">
.layout-padding
    q-search(v-model="search")
    .row.xs-gutter(v-if="events")
      .col-xs-12.col-sm-6.col-md-4.col-lg-3(v-for="(event,i) in events", :key="i")
        q-card(inline style="height: 300px" @click="$emit('selectEvent',event.id)").cursor-pointer.no-margin
          q-card-media(overlay-position="full").fit
            img(:src="event.image").fit
            q-card-title(slot="overlay") {{event.name}}
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
