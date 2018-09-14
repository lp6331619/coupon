/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 订单管理
 * @type {Object}
 */
export default [{
        name: '票务订单',
        method: 'ticketOrder_lists',
        path: '/ticketOrder/lists',
        type: 'get',
    },
    {
        name: '票务订单详情',
        method: 'ticketOrder_detail',
        path: '/ticketOrder/detail',
        type: 'get',
    },
    {
        name: '旅行订单列表',
        method: 'order_lists',
        path: '/order/lists',
        type: 'get',
    },
    {
        name: '旅行订单详情',
        method: 'order_detail',
        path: '/order/detail',
        type: 'get',
    },
    {
        name: '退款',
        method: 'ticketOrder_refund',
        path: '/ticketOrder/refund',
        type: 'post',
    },
    {
        name: '取消订单',
        method: 'ticketOrder_cancel',
        path: '/ticketOrder/cancel',
        type: 'post',
    },
    {
        name  : '获取产品评价列表',
        method: 'comment',
        path  : '/comment',
        type  : 'get',
    },
    {
        name: '评价订单',
        method: 'comment_add',
        path: '/comment/add',
        type: 'post',
    },
    {
        name: '改签',
        method: 'ticketOrder_change',
        path: '/ticketOrder/change',
        type: 'post',
    },
    
];