import Vue from 'vue';
import axios from 'axios'

// var $axios = axios.create({
//     withCredentials : false,
//     emulateJSON : false
// });
Vue.prototype.axios = axios;

// var loading = false
// Vue.prototype.loading = loading

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = true;
Vue.config.devtools = true;

// 引入mint全部组件
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
import common from './assets/js/common'
Vue.use(common);

import 'mint-ui/lib/style.css';

import router from 'router/';
import 'register/';
import store from 'store/';
Vue.prototype.lang = store.state.commondata.lang


//微信判断
Vue.prototype.headStatus = true;
var ua = navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) != 'micromessenger') {
    Vue.prototype.headStatus = false;
}
//公用scss
import './assets/scss/common.scss'
import './assets/css/swiper.min.css'

import App from './App';

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

router.beforeEach((to, from, next) => {
    document.title = to.name;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) != 'micromessenger') {
        next()
    } else {
        if (!store.state.user.userinfo.token) {
            next()
            next('/home')
        } else {
            next()
        }
    }
})