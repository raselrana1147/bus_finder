/**
 * Created by aminur on 4/6/21.
 */

export const GET_BUS_OWNER = (state, data) => {
  state.bus_owners = data.data.data;
  state.pagination = data.data;
}

export const GET_BUS_GROUP = (state, data) => {
  state.bus_groups = data;
};

export const GET_OWNER = (state, data) => {
  state.owners = data;
};

export const STORE_BUS_OWNER = (state, data) => {
  if (state.bus_owners.push(data.bus_owner)){
    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const EDIT_BUS_OWNER = (state, data) => {
  state.bus_owner = data;
};

export const UPDATE_BUS_OWNER = (state, data) => {
  if (state.bus_owners.push(data.bus_owner)){
    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const DELETE_BUS_OWNER = (state, {id,data}) => {
  if (id){
    state.bus_owners = state.bus_owners.filter(item => {
      return item.id !== id;
    })

    state.success_message = data.message
  }else {
    state.success_message = '';
  }
};
