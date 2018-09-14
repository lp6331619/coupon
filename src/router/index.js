/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import { Home, Content } from 'layout/';
import { Shop, User, Traveler, Temporary } from 'views/';

export default new Router({
    mode: 'history',
    // base: '/gl/',
    routes: [{
            path: '/',
            name: 'home',
            redirect: '/home'
        },
        // { 
        // 	path: '*', 
        // 	component: NotFoundComponent 
        // },
        {
            path: '/temporary',
            name: '中转',
            component: Temporary
        },
        {
            path: '/index.html',
            name: '首页',
            redirect: Shop.HomeBox
        },
        {
            path: '/home',
            name: '商铺',
            component: Content,
            children: [{
                path: '',
                name: '商铺1',
                component: Shop.HomeBox,
            }, {
                path: 'lang',
                name: '语言',
                component: Shop.Lang,
            }, {
                path: 'ticket',
                name: '车票',
                component: Shop.Ticket,
            }, {
                path: 'list',
                name: '车票2',
                component: Shop.List,
            }, {
                path: 'list2',
                name: '旅游',
                component: Shop.List2,
            }, {
                path: 'detail2',
                name: '旅游2',
                component: Shop.Detail2,
            }, {
                path: 'form',
                name: '旅游3',
                component: Shop.Form,
            }, {
                path: 'success',
                name: '成功',
                component: Shop.Success,
            }]
        }, {
            path: '/user',
            name: '我的',
            component: Content,
            children: [{
                    path: '',
                    name: '我的',
                    component: User.HomeBox,
                }, {
                    path: 'user',
                    name: '我的资料',
                    component: User.UserBox,
                }, {
                    path: 'list',
                    name: '订单',
                    component: User.List,
                }, {
                    path: 'traveler',
                    name: '常用旅客',
                    component: User.Traveler,
                },
                // {
                // 	path     : 'travelerDetail',
                // 	name     : '常用旅客',
                // 	component: User.TravelerDetail,
                // },
                {
                    path: 'detail',
                    name: '详情',
                    component: User.Detail,
                }, {
                    path: 'detail2',
                    name: '详情2',
                    component: User.Detail2,
                }, {
                    path: 'change',
                    name: '改签',
                    component: User.Change,
                }, {
                    path: 'success',
                    name: '成功',
                    component: User.Success,
                }, {
                    path: 'difference',
                    name: '补差价',
                    component: User.Difference,
                }, {
                    path: 'coupon',
                    name: '优惠劵',
                    component: User.Coupon,
                }
            ]
        }, {
            path: '/traveler',
            name: '消费劵',
            component: Content,
            children: [{
                path: '',
                name: '消费劵列表',
                component: Traveler.List,
            }, {
                path: 'detail',
                name: '消费劵详情',
                component: Traveler.Detail,
            }]
        }, { //支付页面
            path: '/pay',
            name: '车票',
            component: Content,
            children: [{
                path: 'detail',
                name: '票务订单车票',
                component: Shop.Detail,
            }, {
                path: 'orderDetail',
                name: '订单支付',
                component: User.Detail,
            }, {
                path: 'orderDetail2',
                name: '订单支付',
                component: User.Detail2,
            }, {
                path: 'formDetail',
                name: '旅行订单支付',
                component: Shop.Form,
            }]
        }
    ]
})