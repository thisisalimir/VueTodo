<template>
    <div>{{ remainig }} Items Left</div>
</template>

<script>
    export default {
        name: "TodoItemsRemaining",
        computed: {
            remainig() {//For Remaining Items
                return this.$store.getters.remainig;
            }
        }
    }
</script>