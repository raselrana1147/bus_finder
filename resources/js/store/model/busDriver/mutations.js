/**
 * Created by aminur on 4/7/21.
 */

export const GET_BUS_DRIVER = (state, data) => {
  state.bus_drivers = data.data.data;
  state.pagination = data.data;
};

export const GET_ASSIGN_BUS_DRIVER = (state, data) => {
  state.bus_assign_to_driver = data.data.data;
  state.pagination = data.data;
};

export const GET_BUS_NUMBER = (state, data) => {
  state.bus_number = data;
};

export const GET_CURRENT_DRIVER = (state, data) => {
  state.current_driver = data;
};

export const STORE_BUS_DRIVER = (state, data) => {
  if (state.bus_assign_to_driver.push(data.bus_driver)){
    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const EDIT_BUS_DRIVER = (state, data) => {
 state.bus_assign_to_d = data;
};

export const ALL_BUS_NUMBER = (state, data) => {
  state.all_bus_numbers = data;
};

export const UPDATE_BUS_DRIVER = (state, data) => {
  if (state.bus_assign_to_driver.push(data.bus_driver)){
    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const DELETE_BUS_DRIVER = (state, {id,data}) => {
  if (id){
    state.bus_assign_to_driver = state.bus_assign_to_driver.filter(item => {
      return item.id !== id;
    })

    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};
