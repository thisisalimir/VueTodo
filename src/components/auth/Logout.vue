<template>
</template>

<script>
    export default {
        created() {//after logout redirect to home
            this.$store.dispatch('clearTodos');
            this.$store.dispatch('destroyToken').then(response => {
                this.$router.push({name: 'home'});
            });
        }
    }
</script>

<style scoped>

</style>