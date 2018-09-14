import {
    store
} from 'utils/';
export default {
	//获取用户信息
	listTickey: store.get('listTickey') || {},
};
