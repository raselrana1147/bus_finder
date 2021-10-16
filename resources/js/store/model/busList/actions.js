/**
 * Created by aminur on 4/6/21.
 */

import { http } from '../../../Service/apiService'

export const get_busList = ({commit}, data) => {
  return http().get('bus_list?'+data).then(res => {
    commit('GET_BUS_LIST', res.data);
  })
};

export const get_owner_info = ({commit}, bus_group_id) => {
  return http().get(`bus_list/get_owner_data/${bus_group_id}`).then(res => {
    commit('GET_OWNER_INFO', res.data.owner);
  })
};

export const add_bus = ({commit}, data) => {
  return http().post('bus_list/store', data).then(res => {
    commit('STORE_BUS', res.data);
  })
};

export const edit_bus_list = ({commit},id) => {
  return http().get(`bus_list/edit/${id}`).then(res => {
    commit('EDIT_BUS_LIST', res.data.bus_list);
  })
};

export const update_bus_list = ({commit},{id, data}) => {
  return http().post(`bus_list/update/${id}`, data).then(res => {
    commit('UPDATE_BUS_LIST', res.data);
  })
};

export const delete_bus = ({commit},id) => {
  return http().delete(`bus_list/destroy/${id}`).then(res => {
    commit('DELETE_BUS', {id:id,data:res.data});
  })
};
