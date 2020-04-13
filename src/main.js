// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Master from "./components/layouts/Master";
import {store} from './store/store'
import routes from "./routes";

//Event Bus: Allows All Component to communicate and not limit to Parent child
window.eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history'
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    store: store,
    components: {Master},
    template: '<Master/>'
});
