/**
 * Created by aminur on 4/3/21.
 */

import { http } from '../../../Service/apiService'

export const get_bus_gourps = ({commit},data) => {
  return http().get('bus_group/getData?'+ data).then(res => {
    commit('GET_BUS_GROUPS', res.data);
  })
};

export const add_bus_group = ({commit}, data) => {
  return http().post('bus_group/store', data).then(res => {
      commit('STORE_BUS_GROUP', res.data);
  })
};

export const edit_bus_group = ({commit},id) => {
  return http().get(`bus_group/edit/${id}`).then(res => {
      commit('EDIT_BUS_GROUP', res.data.bus_group)
  })
};

export const update_bus_group = ({commit},{id,data}) => {
  return http().post(`bus_group/update/${id}`, data).then(res => {
    commit('UPDATE_BUS_GROUP', res.data);
  })
};

export const delete_bus_group = ({commit}, id) => {
  return http().delete(`bus_group/destroy/${id}`).then(res => {
    commit('BUS_GROUP_DESTROY', {id:id, data:res.data});
  })
};

