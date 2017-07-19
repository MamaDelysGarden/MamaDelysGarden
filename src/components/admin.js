import { Alert } from 'quasar'
export default {
    methods: {
        select(item) {
            let alert = Alert.create({
                enter: 'bounceInRight',
                leave: 'bounceOutRight',
                html: `Editing ${this.label}: ${item.name}`,
                position: 'top-right',
                color: 'positive',
                icon: 'edit',
                dismissable: false
            }), timeOut

            timeOut = setTimeout(() => {
                alert.dismiss()
                clearInterval(timeOut)
            }, 3000)

            this.$router.push({ name: `admin-${this.label.toLowerCase()}`, params: { id: item.id } })
        }
    }
}