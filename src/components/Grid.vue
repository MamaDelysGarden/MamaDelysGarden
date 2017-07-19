<template lang="pug">
div
    .layout-padding(style="padding-bottom: 0")
        q-search(v-model="search")
    .layout-padding(v-if="items.length")
        .row.xs-gutter
            .col-xs-12.col-sm-6.col-md-3(v-for="(item,i) in items", :key="i")
                q-card(inline style="height: 300px" @click="$emit('select',item)").cursor-pointer.no-margin
                    q-card-media(overlay-position="full").fit
                        img(:src="item.image").fit
                        .relative-position(slot="overlay")
                            q-card-title {{item.name}}
                            p.text-center {{item.description}}
                            h6.absolute.text-center(style="top: 250px; left: 16px") {{item.createdAt | formatDate("MMM, DD, YYYY")}}
    .row(v-else style="height: calc(100vh - 200px)")
        .text-center.centered(style="margin: auto").capitalize
            h1(v-if="!loading") No {{label}}
            h1(v-else) Loading {{label}}
</template>

<script>
import { date } from 'quasar'

export default {
    name: 'grid',
    props: ['label'],
    inject: ['gql'],
    data() {
        return {
            search: '',
            loading: 0,
            items: []
        }
    },
    filters: {
        formatDate(val,format) {
            let formatted =date.formatDate(val,format)
            console.log(formatted)
            return formatted
        }
    },
    apollo: {
        items() {
            return {
                loadingKey: 'loading',
                query() {
                    return this.gql.queries[this.label]
                },
                variables() {
                    return {
                        search: this.search
                    }
                },
                update: data => data[this.label],
                pollInterval: 1000
            }
        }
    }
}
</script>
