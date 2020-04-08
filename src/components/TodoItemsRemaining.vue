<template>
    <div>{{ remainig }} Items Left</div>
</template>

<script>
    export default {
        name: "TodoItemsRemaining",
        props: {
            remainig: {
                type: Number,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>