/**
 * Created by aminur on 4/4/21.
 */

import { http } from '../../../Service/apiService'

export const get_user = ({commit}, data) => {
  return http().get('user?'+data).then(res => {
    commit('GET_USER', res.data)
  })
};

export const add_user = ({commit}, data) => {
  return http().post('user/store', data).then(res => {
    commit('STORE_USER', res.data)
  })
};

export const edit_user = ({commit},id) => {
  return http().get(`user/edit/${id}`).then(res => {
    commit('EDIT_USER', res.data.user);
  })
};

export const update_user = ({commit}, {id, data}) => {
  return http().post(`user/update/${id}`, data).then(res => {
    commit('UPDATE_USER', res.data)
  })
};

export const delete_user = ({commit}, id) => {
  return http().delete(`user/destroy/${id}`).then(res => {
    commit('DELETE_USER', {id:id, data:res.data})
  })
};

export const change_status = ({commit}, id) => {
  return http().post(`user/status_change/${id}`).then(res => {
    commit('STATUS_CHANGE', res.data);
  })
};