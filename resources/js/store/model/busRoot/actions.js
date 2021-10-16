/**
 * Created by aminur on 4/6/21.
 */

import { http } from '../../../Service/apiService'

export const get_bus_root = ({commit}, data) => {
  return http().get('bus_root?'+data).then(res => {
    commit('GET_BUS_ROOT', res.data);
  })
};

export const add_bus_root = ({commit}, data) => {
  return http().post('bus_root/store', data).then(res => {
    commit('STORE_BUS_ROOT', res.data);
  })
};

export const edit_bus_root = ({commit}, id) => {
  return http().get(`bus_root/edit/${id}`).then(res => {
    commit('EDIT_BUS_ROOT', res.data.bus_root);
  })
};

export const update_bus_root = ({commit}, {id,data}) => {
  return http().post(`bus_root/update/${id}`, data).then(res => {
    commit('UPDATE_BUS_ROOT', res.data);
  })
};

export const delete_bus_root = ({commit}, id) => {
  return http().delete(`bus_root/destroy/${id}`).then(res => {
    commit('DESTROY_BUS_ROOT', {id:id, data:res.data});
  })
};
