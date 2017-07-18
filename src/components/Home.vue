<template lang="pug">
.window-height.relative-position
    q-carousel.text-white(arrows dots infinite autoplay).fit.absolute
        img(v-for="(image,i) in images", :key="i", :src="image" slot="slide")
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            images: [
                "https://scontent.fmnl4-1.fna.fbcdn.net/v/t31.0-8/18595645_298509983938729_3080520903457580186_o.jpg?_nc_eui2=v1%3AAeEM6xOJJBfB1p-MZVCxhPfkGqJu-hjeEQNIWvvJLiN7rB7zlfx1lfCgb4mN253TQFaZPd_GxwCrAAhSy3rjA17qZyy3d5VbVUHxNzBcSH8SJA&oh=bceae61e5d90e2c2e756367e1cd4ba01&oe=59F1B6E5",
                "https://scontent.fmnl4-1.fna.fbcdn.net/v/t31.0-8/19620217_319487241841003_6134132989699157489_o.jpg?_nc_eui2=v1%3AAeHgfT8B5FxFuVKVLrKGn46MWB7_70CRmYGRdE0akIYVBzPe6QMp3wNq0Gbiny2v-TweN45YK_0dgrHCH7HvzsdQzlTaDCh1PRhqgNo2pS7Y2A&oh=90997a80b514ef79d8fbf7ece1a5534a&oe=5A0F274B",
                "https://scontent.fmnl4-1.fna.fbcdn.net/v/t1.0-9/18664564_300401140416280_7362651819520374646_n.jpg?_nc_eui2=v1%3AAeG7ktiepZRLilq3TLe1Gqe5guhG2gdN48TxCV6I5x63L92VQ6WTvPayIMywFnau8xy1FURLpZki26E9LBvaxHWMQtBbEVYzOf1r_0Y-83gsEg&oh=e8cfc72cd0568d5bc135387fbffb08a3&oe=59FB5028"
            ]
        }
    }
}
</script>
