/**
 * Created by sailengsi on 2018/4/3.
 */

/**
 * 产品模块
 * @type {Object}
 */
export default [
    {
        name  : '获取产品列表',
        method: 'goods',
        path  : '/goods',
        type  : 'get',
    },
    {
        name  : '产品详情',
        method: 'detail',
        path  : '/goods/detail',
        type  : 'get',
    },
    {
        name  : '下单',
        method: 'order_book',
        path  : '/order/book',
        type  : 'post',
    },

];