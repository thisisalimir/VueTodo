<template>
    <div id="app" class="flex flex-col h-screen justify-between">
        <!--Nav-->
        <nav id="header" class="fixed w-full z-30 top-0 text-white">

            <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">

                <div class="pl-4 flex items-center">
                    <a class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl logo"
                       href="#">
                        <!--Icon from: http://www.potlabicons.com/ -->
                        <svg class="h-8 fill-current inline svg " id="icon-check" viewBox="0 0 225 225" version="1.1"
                             xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink"
                             xml:space="preserve"
                             style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
                        <g transform="matrix(1,0,0,1,-178.667,-170.667)">
                                <g class="check" transform="matrix(1,0,0,1,176,113)">
                                        <path d="M65,166L101,202L165,138"
                                              style="fill:none;stroke:#ea3970;stroke-width:16.67px;"/>
                                </g>
                            <circle class="circle" cx="291" cy="283" r="104"
                                    style="fill:none;stroke:#2a2a31;stroke-width:16.67px;"/>
                        </g>
                </svg>
                        VueTodo
                    </a>
                </div>

                <div class="block lg:hidden pr-4">
                    <button id="nav-toggle" class="flex items-center p-1 text-orange-800 hover:text-gray-900">
                        <svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>
                            Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                        </svg>
                    </button>
                </div>

                <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
                     id="nav-content">
                    <ul class="list-reset lg:flex justify-end flex-1 items-center">
                        <li v-if="!loggedIn" class="mr-3">
                            <router-link :to="{ name:'register' }"
                                         class="inline-block py-2 px-4 text-gray-800  font-bold no-underline">
                                Register
                            </router-link>
                        </li>

                        <li v-if="loggedIn" class="mr-3">
                            <div class="inline-block py-2 px-4 text-gray-800  font-bold no-underline">
                                Welcome, {{ name }}
                            </div>
                        </li>
                    </ul>
                    <button v-if="loggedIn" id="navLogoutAction"
                            class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75">
                        <router-link :to="{ name:'logout' }">Logout</router-link>
                    </button>

                    <button v-if="!loggedIn" id="navAction"
                            class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75">
                        <router-link :to="{ name:'login' }">Login</router-link>
                    </button>
                </div>
            </div>

            <hr class="border-b border-gray-100 opacity-25 my-0 py-0"/>
        </nav>
        <transition name="router-animation" enter-active-class="animated fadeIn" mode="out-in"
                    leave-active-class="animated fadeOut">
            <router-view></router-view>
        </transition>

        <!--Footer-->
        <footer class="bg-white">
            <div class="container mx-auto">
                <div class="w-full flex flex-col md:flex-row py-3">

                    <div class="flex-1 text-center">

                        <a class="text-green-600 no-underline hover:no-underline font-bold  lg:text-1xl" href="#">
                            Create By Ali Fatahi
                        </a>
                    </div>
                </div>
            </div>
        </footer>

        <!--        <div class="footer-content footer-container">-->
        <!--            <div class="made-with">Made by <a href="mailto:a.fatahi1992@gmail.com">Ali Fatahi</a></div>-->
        <!--            <ul>-->
        <!--                <li><router-link :to="{ name:'about' }">About</router-link></li>-->
        <!--                <li><router-link :to="{ name:'about' }">ContactUs</router-link></li>-->
        <!--            </ul>-->
        <!--        </div> &lt;!&ndash; end footer-content &ndash;&gt;-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
            }
        },
        created() {
            this.$store.dispatch('retrieveName')
                .then(response => {
                    this.name = response.data.name;
                });
        },
        computed: {
            loggedIn() {
                return this.$store.getters.loggedIn
            }
        }
    }

    window.onload = function () {
        let scrollpos = window.scrollY;
        let header = document.getElementById("header");

        let navcontent = document.getElementById("nav-content");
        let navaction = document.getElementById("navAction");
        let navLogoutAction = document.getElementById("navLogoutAction");
        let brandname = document.getElementById("brandname");
        let toToggle = document.querySelectorAll(".toggleColour");

        document.addEventListener('scroll', function () {

            /*Apply classes for slide in bar*/
            scrollpos = window.scrollY;

            if (scrollpos > 10) {
                header.classList.add("bg-white");
                if (navaction) {
                    navaction.classList.remove("bg-white");
                    navaction.classList.add("gradient");
                    navaction.classList.remove("text-gray-800");
                    navaction.classList.add("text-white");
                }
                if (navLogoutAction) {
                    navLogoutAction.classList.remove("bg-white");
                    navLogoutAction.classList.add("gradient");
                    navLogoutAction.classList.remove("text-gray-800");
                    navLogoutAction.classList.add("text-white");
                }


                //Use to switch toggleColour colours
                for (var i = 0; i < toToggle.length; i++) {
                    toToggle[i].classList.add("text-gray-800");
                    toToggle[i].classList.remove("text-white");
                }
                header.classList.add("shadow");
                navcontent.classList.remove("bg-gray-100");
                navcontent.classList.add("bg-white");
            } else {
                header.classList.remove("bg-white");

                if (navaction) {
                    navaction.classList.remove("gradient");
                    navaction.classList.add("bg-white");
                    navaction.classList.remove("text-white");
                    navaction.classList.add("text-gray-800");
                }
                if (navLogoutAction) {
                    navLogoutAction.classList.remove("gradient");
                    navLogoutAction.classList.add("bg-white");
                    navLogoutAction.classList.remove("text-white");
                    navLogoutAction.classList.add("text-gray-800");
                }
                //Use to switch toggleColour colours
                for (var i = 0; i < toToggle.length; i++) {
                    toToggle[i].classList.add("text-white");
                    toToggle[i].classList.remove("text-gray-800");
                }

                header.classList.remove("shadow");
                navcontent.classList.remove("bg-white");
                navcontent.classList.add("bg-gray-100");
            }

        });


        /*Toggle dropdown list*/
        /*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/

        var navMenuDiv = document.getElementById("nav-content");
        var navMenu = document.getElementById("nav-toggle");

        document.onclick = check;

        function check(e) {
            var target = (e && e.target) || (event && event.srcElement);

            //Nav Menu
            if (!checkParent(target, navMenuDiv)) {
                // click NOT on the menu
                if (checkParent(target, navMenu)) {
                    // click on the link
                    if (navMenuDiv.classList.contains("hidden")) {
                        navMenuDiv.classList.remove("hidden");
                    } else {
                        navMenuDiv.classList.add("hidden");
                    }
                } else {
                    // click both outside link and outside menu, hide menu
                    navMenuDiv.classList.add("hidden");
                }
            }

        }

        function checkParent(t, elm) {
            while (t.parentNode) {
                if (t == elm) {
                    return true;
                }
                t = t.parentNode;
            }
            return false;
        }
    }
</script>


<style lang="scss">
    @import url("https://unpkg.com/tailwindcss/dist/tailwind.min.css");
    @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700");
    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
    @import url('cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css');
    @import "../../assets/css/style";
</style>