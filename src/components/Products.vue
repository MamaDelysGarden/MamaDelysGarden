<template lang="pug">
    grid(label="products", :category="category", @select="$emit('select',$event)")
      q-select(slot="header" v-model="category" float-label="Category", :options="categories")
</template>

<script>

export default {
    name: 'products',
    data() {
        return {
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

}
</script>
