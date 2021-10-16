/**
 * Created by aminur on 4/7/21.
 */

import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './acrtions';

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
