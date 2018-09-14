/**
 * Created by sailengsi on 2018/4/3.
 */
/**
 * shop
 * @type {Object}
 */
export default [
	{
		name:'首页',
		method:'index',
		path:'/index/index',
		type:'post',
	},
	{
		name:'汽/火/船下单',
		method:'ticketOrderBook',
		path:'/ticketOrder/book',
		type:'post',
	},
	{
		name:'订单详情',
		method:'ticketOrderDetail',
		path:'/ticketOrder/detail',
		type:'post',
	},
	{
		name:'领取优惠券',
		method:'coupon_index',
		path:'/coupon/index',
		type:'post',
	},
	{
		name:'优惠券列表',
		method:'coupon_lists',
		path:'/coupon/lists',
		type:'get',
	},

];