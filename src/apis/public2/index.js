/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 订单管理
 * @type {Object}
 */
export default [
	{
		name:'登陆',
		method:'login',
		path:'/user/login',
		type:'get',
	},
	{
		name:'获取用户信息',
		method:'userinfo',
		path:'/user/userinfo',
		type:'get',
	},
	{
		name:'获取国家列表信息',
		method:'countrys',
		path:'/public/countrys',
		type:'get',
	},
	{
		name:'获取某个国家城市列表信息',
		method:'citys',
		path:'/public/citys',
		type:'get',
	},
	{
		name:'票查询',
		method:'ticketSearch_search',
		path:'/ticketSearch/search',
		type:'post',
	},
	{
		name:'火车票查询',
		method:'ticketSearch_train',
		path:'/ticketSearch/train',
		type:'post',
	},
	{
		name:'汽车票查询',
		method:'ticketSearch_bus',
		path:'/ticketSearch/bus',
		type:'post',
	},
	{
		name:'船票查询',
		method:'ticketSearch_ship',
		path:'/ticketSearch/ship',
		type:'post',
	},
	{
		name:'飞机票查询',
		method:'flight',
		path:'/ticketSearch/flight',
		type:'post',
	},
	{
		name:'飞机站点查询',
		method:'flight_citys',
		path:'/public/flight_citys',
		type:'get',
	},
	{
        name  : '获取乘客',
        method: 'get_passagers',
        path  : '/user/get_passagers',
        type  : 'get',
    },
    {
        name  : '添加乘客',
        method: 'add_passager',
        path  : '/user/add_passager',
        type  : 'post',
    },
    {
        name  : '支付',
        method: 'payDopay',
        path  : '/pay/dopay',
        type  : 'post',
    },
    {
        name  : '支付',
        method: 'jssdk_config',
        path  : '/public/jssdk_config',
        type  : 'get',
    },
];