/**
 * Created by sailengsi on 2017/5/11.
 */

/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */

import shop from './shop/';
import order from './order/';
import product from './product/';
import public2 from './public2/';

export default [{
    module:'shop',
    name:'首页',
    list:shop
},{
    module:'order',
    name:'订单管理',
    list:order
},{
    module:'public',
    name:'公用',
    list:public2
},{
    module:'product',
    name:'产品',
    list:product
}];