<template>
    <div class="pt-24">
        <div class="container mx-auto text-center py-6 mb-12 w-full md:w-1/3">
            <form action="#" @submit.prevent="register">

                <div v-if="serverErrors" class="server-error">
                    <div v-for="(value,key) in serverErrors" :key="key">
                        {{ value[0] }}
                    </div>
                </div>

                <div class="w-full  px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                           for="grid-first-name">
                        Name
                    </label>
                    <input type="text" name="name" id="name"
                           class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                           v-model="name"
                           required>
                </div>

                <div class="w-full  px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                           for="grid-first-name">
                        Email
                    </label>
                    <input type="text" name="email" id="email"
                           class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                           v-model="email"
                           required>
                </div>

                <div class="w-full  px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                           for="grid-first-name">
                        Password
                    </label>
                    <input type="password" name="password" id="password"
                           class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                           v-model="password"
                           required>
                </div>
                <button type="submit"
                        class="mx-auto lg:mx-0 hover:underline bg-white text-gray-600 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                    Create Account
                </button>

            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                name: '',
                email: '',
                password: '',
                serverErrors: '',
            }
        },
        methods: {
            register() {
                this.$store.dispatch('register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                }).then(response => {
                    this.successMessage = 'Register Successfully!';
                    this.$router.push({name: 'login', params: {dataSuccessMessage: this.successMessage}})
                    this.$toast.success({
                        title: this.successMessage,
                        message: 'You Can login here'
                    })
                }).catch((error) => {
                    this.serverErrors = Object.values(error.response.data.errors);
                })
            }
        }
    }
</script>

<style scoped>

</style>