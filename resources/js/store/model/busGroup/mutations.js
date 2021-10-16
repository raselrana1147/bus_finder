/**
 * Created by aminur on 4/3/21.
 */

export const GET_BUS_GROUPS = (state, data) => {
  state.bus_groups = data.data.data
  state.pagination = data.data;
};

export const STORE_BUS_GROUP = (state, data) => {
  if (state.bus_groups.push(data.bus_group)){
      state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const EDIT_BUS_GROUP = (state, data) => {
  state.bus_group = data;
};

export const UPDATE_BUS_GROUP = (state, data) => {
  if (state.bus_groups.push(data.bus_group))
  {
    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const BUS_GROUP_DESTROY = (state, {id,data}) => {

  if (id){
    state.bus_groups = state.bus_groups.filter(item => {
        return item.id !== id;
    })

    state.success_message = data.message;
  }else {
    state.success_message = '';
  }

}