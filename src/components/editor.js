import { Toast } from 'quasar'

export default {
    inject: ['gql'],
    data() {
        return {
            loading: 0,
          item: null
        }
    },
    computed: {
        lower() {
            return this.label.toLowerCase()
        },
        ready() {
            return !this.loading && (this.item || this.edit)
        },
        changed() {
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
                mutation: this.gql.mutations[`delete${this.label}`],
                variables: {
                    id: this.item.id
                }
            })

            await this.$apollo.queries.item.refetch()
            done()

            Toast.create.positive({
                html: `${this.label} Deleted`
            })

            this.$router.back()

        },
        async save(e, done) {
            try {
                let query = `${this.isAdd ? 'create' : 'update'}${this.label}`

                await this.$apollo.mutate({
                    mutation: this.gql.mutations[query],
                    variables: { ...this.edit },
                })

                await this.$apollo.queries.item.refetch()
                done()

                Toast.create.positive({
                    html: `${this.label} ${this.isAdd ? 'Added' : 'Updated'}`
                })

            }
            catch (e) {
                console.log(e)
                Toast.create.negative({
                    html: `Error ${this.isAdd ? 'Adding' : 'Updating'} ${this.label}`
                })
            }

            this.$router.back()
        },
    },
    apollo: {
        item() {
            return {
                loadingKey: 'loading',
                query() {
                    return this.gql.queries[this.lower]
                },
                variables() {
                    return {
                        id: this.id
                    }
                },
                result({ data: { item } }) {
                    this.item = item
                    if (!item) return
                    this.edit = { ...item }
                },
                skip() {
                    return this.isAdd
                }
            }
        }
    }
}
