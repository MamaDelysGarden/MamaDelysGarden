<template lang="pug">
    grid(label="products" @select="$emit('select',$event)")
</template>

<script>

export default {
    name: 'products',
}
</script>
