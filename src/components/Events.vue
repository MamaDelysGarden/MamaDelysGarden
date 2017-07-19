<template lang="pug">
    grid(label="events" @select="$emit('select',$event)")
</template>

<script>

export default {
    name: 'events',
}
</script>
