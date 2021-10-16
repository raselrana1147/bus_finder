/**
 * Created by aminur on 4/6/21.
 */

export const GET_BUS_LIST = (state, data) => {
  state.bus_lists = data.data.data;
  state.pagination = data.data;
};

export const GET_OWNER_INFO = (state, data) => {
  state.owner = data;
};

export const STORE_BUS = (state, data) => {
  if (state.bus_lists.push(data.bus_list)){
    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const EDIT_BUS_LIST = (state, data) => {
  state.bus_list = data;
};

export const UPDATE_BUS_LIST = (state, data) => {
  if (state.bus_lists.push(data.bus_list)){
    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const DELETE_BUS = (state,{id,data}) => {
  if (id){
    state.bus_lists = state.bus_lists.filter(item => {
      return item.id !== id;
    })

    state.success_message = data.message
  }else {
    state.success_message = '';
  }
};
