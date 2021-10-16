/**
 * Created by aminur on 4/1/21.
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

//import module
import busGroup from './model/busGroup';
import user_setup from './model/user';
import bus_owner from './model/busOwner';
import bus_list from './model/busList';
import bus_root from './model/busRoot';
import bus_driver from './model/busDriver';

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,

    modules:{
        busGroup,
        user_setup,
        bus_owner,
        bus_list,
        bus_root,
        bus_driver
    }

});
