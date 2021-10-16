/**
 * Created by aminur on 4/4/21.
 */

export const GET_USER = (state, data) => {
  state.users = data.data.data;
  state.pagination = data.data;
};

export const STORE_USER = (state, data) => {
  if (state.users.push(data.user)){
      state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const EDIT_USER = (state, data) => {
  state.user = data;
};

export const UPDATE_USER = (state, data) => {
  if (state.users.push(data.user)){
    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};

export const DELETE_USER = (state, {id,data}) => {
  if (id){
    state.users = state.users.filter(item => {
      return item.id !== id;
    })

    state.success_message = data.message
  }else {
    state.success_message = '';
  }
};

export const STATUS_CHANGE = (state, data) => {
  if (state.users.concat(data.user)){
    state.success_message = data.message;
  }else {
    state.success_message = '';
  }
};
