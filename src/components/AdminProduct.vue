<template lang="pug">
  .layout-padding(v-if="ready" style="padding-bottom: 100px")
    q-btn(round color="secondary" big loader, :disabled="changed", @click="save" style="bottom: 18px; right: 18px;").fixed-bottom-right.z-absolute
      q-icon(name="save")
    q-btn(round color="negative" v-if="!isAdd" big loader @click="remove" style="bottom: 18px; left: 18px;").fixed-bottom-left.z-absolute
      q-icon(name="delete")
    h4.ellipsis {{item ? item.name : `Add ${label}`}}
    q-input(v-model="edit.name" float-label="Name", :readonly="loading")
    q-input(v-model="edit.description" type="textarea" float-label="Description", :readonly="loading")
    .text-center
      img(:src="item ? item.image : edit.image" style="height: 300px; width: 300px")
    q-input(v-model="edit.image" float-label="Image", :readonly="loading")
    q-select(v-model="category" float-label="Category", :options="categories")
  .row.window-height(v-else-if="loading")
    .text-center(style="margin: auto")
      h2 Loading {{label}}
</template>

<script>

import editor from './editor'

export default {
  name: 'admin-product',
  props: ['id'],
  mixins: [editor],
  watch: {
    category(val) {
      this.edit.category = val
    }
  },
  data() {
    return {
      category: "STARTER",
      edit: {
        name: '',
        description: '',
        image: '',
        category: 'STARTER'
      },
      label: 'Product',
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
