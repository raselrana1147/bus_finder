/**
 * Created by aminur on 4/1/21.
 */

export const ADD_NEW_USER = (state, data) => {
  if (state.users.push(data.register)){

      state.success_message = data.message;
  }else {
    state.success_message = '';
  }

}

export const SET_TOKEN = (state, token) => {
  state.token = token;
};

export const SET_USER = (state, data) => {
  state.user = data;
};
