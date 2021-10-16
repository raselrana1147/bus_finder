import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//sweet alert import
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

//mixins import
import AllMixin from './mixins/Allmixins';
Vue.mixin(AllMixin);

store.dispatch('attempt', localStorage.getItem('token'));

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
});
