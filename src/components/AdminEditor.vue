<template lang="pug">
  .layout-padding(v-if="ready" style="padding-bottom: 100px")
    q-btn(round color="secondary" big loader, :disabled="notChanged", @click="save" style="bottom: 18px; right: 18px;").fixed-bottom-right.z-absolute
      q-icon(name="save")
    q-btn(round color="negative" v-if="!isAdd" big loader @click="remove" style="bottom: 18px; left: 18px;").fixed-bottom-left.z-absolute
      q-icon(name="delete")
    h4.ellipsis {{item ? item.name : `Add ${label}`}}
    q-input(v-model="edit.name" float-label="Name", :readonly="loading")
    q-input(v-model="edit.description" type="textarea" float-label="Description", :readonly="loading")
    .text-center
      img(:src="item ? item.image : edit.image" style="height: 300px; width: 300px")
    q-input(v-model="edit.image" float-label="Image", :readonly="loading")
</template>

<script>

import { Toast } from 'quasar'

export default {
    name: 'admin-editor',
    props: ['id', 'edit', 'label'],
    inject: ['gql'],
    data() {
        return {
            loading: 0,
            item: null
        }
    },
    computed: {
        ready() {
            return !this.loading && (this.item || this.edit)
        },
        notChanged() {
            if (!this.item) return
            return Object.keys(this.edit).every(key => this.edit[key] === this.item[key])
        },
        isAdd() {
            return this.id === 'add' && !this.item
        }
    },
    methods: {
        async remove(e, done) {
            await this.$apollo.mutate({
                mutation: this.gql.mutations[`delete${label}`],
                variables: {
                    id: this.item.id
                }
            })
            await this.$apollo.queries.event.refetch()

            done()

            Toast.create.positive({
                html: 'Event Deleted'
            })

            this.$router.back()

        },
        async save(e, done) {
            try {
                await this.$apollo.mutate({
                    mutation: this.gql.mutations[`${this.isAdd ? 'create' : 'update'}${this.label}`],
                    variables: { ...this.edit },
                })

                this.loading = 1

                await this.$apollo.queries[this.label.toLowerCase()].refetch()

                done()
                Toast.create.positive({
                    html: `${this.label} ${this.isAdd ? 'Added' : 'Updated'}`
                })
                this.loading = 0
            }
            catch (e) {
                Toast.create.negative({
                    html: `Error ${this.isAdd ? 'Adding' : 'Updating'} ${this.label}`
                })
            }

            this.$router.back()


        }
    },
    apollo() {
        return {
            [this.label.toLowerCase()]: {
                query() {
                    return this.gql.queries[this.label.toLowerCase()]
                },
                loadingKey: 'loading',
                variables() {
                    return {
                        id: this.id
                    }
                },
                result({ data }) {
                    this.item = { ...data[this.label.toLowerCase()] }
                },
                skip() {
                    return this.isAdd
                }
            }
        }
    }
}
</script>
