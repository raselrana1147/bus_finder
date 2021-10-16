/**
 * Created by aminur on 4/6/21.
 */

import { http } from '../../../Service/apiService'

export const get_busOwner = ({commit}, data) => {
  return http().get('bus_owner?'+data).then(res => {
    commit('GET_BUS_OWNER', res.data);
  })
};

export const get_bus_gourp = ({commit}) => {
  return http().get('bus_owner/get_bus_group').then(res => {
    commit('GET_BUS_GROUP',res.data.bus_groups)
  })
};

export const get_owner = ({commit}) => {
  return http().get('bus_owner/get_owner').then(res => {
    commit('GET_OWNER', res.data.owners);
  })
};


export const add_bus_owner = ({commit}, data) => {
  return http().post('bus_owner/store', data).then(res => {
    commit('STORE_BUS_OWNER', res.data);
  })
};

export const edit_bus_owner = ({commit}, id) => {
  return http().get(`bus_owner/edit/${id}`).then(res => {
    commit('EDIT_BUS_OWNER', res.data.bus_owner);
  })
};

export const update_bus_owner = ({commit}, {id, data}) => {
  return http().post(`bus_owner/update/${id}`, data).then(res => {
    commit('UPDATE_BUS_OWNER', res.data);
  })
};

export const delete_bus_owner = ({commit}, id) => {
  return http().delete(`bus_owner/destroy/${id}`).then(res => {
    commit('DELETE_BUS_OWNER', {id:id, data:res.data})
  })
};