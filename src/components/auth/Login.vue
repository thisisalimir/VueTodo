<template>
    <div class="page-wrapper login-form">
        <h2 class="login-heading">Login</h2>
        <form action="#" @submit.prevent="login">
            <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
            <div v-if="serverError" class="server-error">
                {{ serverError }}
            </div>
            <div class="form-control">
                <label for="email">Email</label>
                <input type="email" name="username" id="username" class="login-input" v-model="username" required>
            </div>

            <div class="form-control mb-more">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="login-input" v-model="password" required>
            </div>

            <div class="form-control">
                <button type="submit" class="btn-submit">
                    <div class="lds-ring-container" v-if="loading">
                        <div class="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    Login
                </button>
            </div>

        </form>
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
                loading: false,
                successMessage: this.dataSuccessMessage,
            }
        },
        methods: {
            login() {
                this.loading = true;
                this.$store.dispatch('retrieveToken', {
                    username: this.username,
                    password: this.password,
                }).then(response => {
                    this.loading = false;
                    this.$router.push({name: 'todo'});
                }).catch((error) => {
                    this.loading = false;
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