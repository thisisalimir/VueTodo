<template>
    <div class="page-wrapper login-form">
        <h2 class="login-heading">Register</h2>
        <form action="#" @submit.prevent="register">

            <div v-if="serverErrors" class="server-error">
                <div v-for="(value,key) in serverErrors" :key="key">
                    {{ value[0] }}
                </div>
            </div>
            <div class="form-control">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" class="login-input" v-model="name" required>
            </div>

            <div class="form-control">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="login-input" v-model="email" required>
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
                    Create Account
                </button>
            </div>

        </form>
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
                loading: false,
            }
        },
        methods: {
            register() {
                this.loading = true;
                this.$store.dispatch('register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                }).then(response => {
                    this.loading = false;
                    this.successMessage = 'Register Successfully!';
                    this.$router.push({name: 'login', params: {dataSuccessMessage: this.successMessage}})
                    this.$toast.success({
                        title: this.successMessage,
                        message: 'You Can login here'
                    })
                }).catch((error) => {
                    this.loading = false;
                    this.serverErrors = Object.values(error.response.data.errors);
                })
            }
        }
    }
</script>

<style scoped>

</style>