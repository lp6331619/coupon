import * as types from './mutations_types'

import {
    store
} from 'utils/';

export default {// 可设置根据父类获取子类方法
    [types.SET_LISTTICKEY](state, result) {
        state.listTickey = result.listTickey;
		store.set('listTickey', result.listTickey);
    },
	[types.SET_COUNTRYS](state, result) {
        state.countrys = result;
        store.set('countrys', result);
    },
    [types.SET_REGEX_ARRAY](state, result) {
        state.regex_array = result;
        store.set('regex_array', result);
    },

};
