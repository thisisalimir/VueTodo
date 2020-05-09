<template>
    <div class="pt-24">
        <div class="container mx-auto text-center py-6 mb-12">
            <form action="#" @submit.prevent="login">
                <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
                <div v-if="serverError" class="server-error">
                    {{ serverError }}
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                               for="grid-first-name">
                            Email
                        </label>
                        <input type="email" name="username" id="username"
                               class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                               v-model="username"
                               required>
                        <div class="server-error">
                           test@test.com
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                               for="grid-last-name">
                            Password
                        </label>
                        <input v-model="password"
                               class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                               id="grid-last-name" type="password">
                        <div class="server-error">
                            password
                        </div>
                    </div>
                </div>


                <button type="submit"
                        class="mx-auto lg:mx-0 hover:underline bg-white text-gray-600 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                    Login
                </button>


            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        props: {
            dataSuccessMessage: {
                type: String,
            }
        },
        data() {
            return {
                username: '',
                password: '',
                serverError: '',
                // loading: false,
                successMessage: this.dataSuccessMessage,
            }
        },
        methods: {
            login() {
                // this.loading = true;
                this.$store.dispatch('retrieveToken', {
                    username: this.username,
                    password: this.password,
                }).then(response => {
                    // this.loading = false;
                    this.$router.push({name: 'todo'});
                }).catch((error) => {
                    // this.loading = false;
                    this.serverError = error.response.data.error_description;
                    this.password = '';
                    this.successMessage = '';
                })
            }
        }
    }
</script>

<style scoped>

</style>