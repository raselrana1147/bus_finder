/**
 * Created by aminur on 4/6/21.
 */

import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
