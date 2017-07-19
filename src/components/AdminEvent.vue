<template lang="pug">
  .layout-padding(v-if="ready" style="padding-bottom: 100px")
    q-btn(round color="secondary" big loader, :disabled="notChanged", @click="saveChanges" style="bottom: 18px; right: 18px;").fixed-bottom-right.z-absolute
      q-icon(name="save")
    q-btn(round color="negative" v-if="!isAdd" big loader @click="deleteEvent" style="bottom: 18px; left: 18px;").fixed-bottom-left.z-absolute
      q-icon(name="delete")
    h4.ellipsis {{event ? event.name : 'Add Event'}}
    q-input(v-model="editEvent.name" float-label="Name", :readonly="loading")
    q-input(v-model="editEvent.description" type="textarea" float-label="Description", :readonly="loading")
    .text-center
      img(:src="event ? event.image : editEvent.image" style="height: 300px; width: 300px")
    q-input(v-model="editEvente.image" float-label="Image", :readonly="loading")
</template>

<script>

import { Toast } from 'quasar'
export default {
  name: 'admin-product',
  props: ['id'],
  inject: ['gql'],
  data() {
    return {
      editEvent: {
        name: '',
        description: '',
        image: ''
      },
      loading: 0
    }
  },
  computed: {
    ready() {
      return !this.loading && (this.event || this.editEvent)
    },
    notChanged() {
      if (!this.event) return
      return Object.keys(this.editEvent).every(key => this.editEvent[key] === this.event[key])
    },
    isAdd() {
      return this.id === 'add' && !this.event
    }
  },
  methods: {
    async deleteEvent(e, done) {
      await this.$apollo.mutate({
        mutation: this.gql.mutations.deleteEvent,
        variables: {
          id: this.event.id
        }
      })
      await this.$apollo.queries.event.refetch()

      done()
      Toast.create.positive({
        html: 'Event Deleted'
      })
      this.$router.push({ name: 'admin-events' })

    },
    async saveChanges(e, done) {
      try {
        await this.$apollo.mutate({
          mutation: this.gql.mutations[this.isAdd ? 'createEvent' : 'updateEvent'],
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
          html: this.isAdd ? 'Error Adding Event' : 'Error Updating Event'
        })
      }
      this.$router.push({ name: 'admin-events' })


    }
  },
  apollo: {
    event: {
      query() {
        return this.gql.queries.event
      },
      loadingKey: 'loading',
      variables() {
        return {
          id: this.id
        }
      },
      result({ data: { event } }) {
        this.editEvent = { ...event }
      },
      skip() {
        return this.isAdd
      }
    }
  }
}
</script>
