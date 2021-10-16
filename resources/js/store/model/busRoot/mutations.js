/**
 * Created by aminur on 4/6/21.
 */

export const GET_BUS_ROOT = (state, data) => {
  state.bus_roots = data.data.data;
  state.pagination = data.data;
};

export const STORE_BUS_ROOT = (state, data) => {
  if (state.bus_roots.push(data.bus_root)){
    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const EDIT_BUS_ROOT = (state, data) => {
  state.bus_root = data;
};

export const UPDATE_BUS_ROOT = (state, data) => {
  if (state.bus_roots.push(data.bus_root)){
    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const DESTROY_BUS_ROOT = (state, {id, data}) => {
  if (id){
    state.bus_roots = state.bus_roots.filter(item => {
      return item.id !== id;
    })

    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};
