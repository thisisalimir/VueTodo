<template>
    <!--Clear Complete Task-->
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
</template>

<script>
    export default {
        name: "TodoClearComplete",
        computed: {
            showClearCompletedButton() {
                return this.$store.getters.showClearCompletedButton;
            }
        },
        methods: {
            clearCompleted() {
                this.$store.dispatch('clearCompleted');
            }
        }
    }
</script>