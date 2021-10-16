/**
 * Created by aminur on 4/7/21.
 */

import { http } from '../../../Service/apiService'

export const get_driver = ({commit}, data) => {
  return http().get('bus_driver?'+data).then(res => {
    commit('GET_BUS_DRIVER', res.data);
  })
};

export const get_assign_driver = ({commit}, {id,data}) => {
  return http().get(`bus_driver/get_assign_data/${id}?`+data).then(res => {
    commit('GET_ASSIGN_BUS_DRIVER', res.data)
  })
};

export const get_bus_number = ({commit}, bus_group_id) => {
  return http().get(`bus_driver/get_assign_bus_number/${bus_group_id}`).then(res => {
    commit('GET_BUS_NUMBER', res.data.bus_number);
  })
};

export const get_Assign_driver = ({commit}, id) => {
  return http().get(`bus_driver/get_current_driver/${id}`).then(res => {
    commit('GET_CURRENT_DRIVER', res.data.driver);
  })
};

export const add_bus_driver_to_assign = ({commit}, data) => {
  return http().post('bus_driver/store', data).then(res => {
    commit('STORE_BUS_DRIVER', res.data);
  })
};

export const getEditBusAssign = ({commit}, id) => {
  return http().get(`bus_driver/edit/${id}`).then(res => {
    commit('EDIT_BUS_DRIVER', res.data.bus_drive);
  })
};

export const get_all_bus_number = ({commit}, bus_group_id) => {
  return http().get(`bus_driver/get_all_bus_number?bus_group_id=`+bus_group_id).then(res => {
    commit('ALL_BUS_NUMBER', res.data.bus_number);
  })
};

export const update_bus_driver = ({commit}, {id, data}) => {
  return http().post(`bus_driver/update/${id}`, data).then(res => {
    commit('UPDATE_BUS_DRIVER', res.data);
  })
};

export const delete_bus_driver = ({commit}, id) => {
  return http().delete(`bus_driver/destroy/${id}`).then(res => {
    commit('DELETE_BUS_DRIVER', {id:id, data:res.data});
  })
};
