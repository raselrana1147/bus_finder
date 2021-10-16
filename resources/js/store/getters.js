/**
 * Created by aminur on 4/1/21.
 */

export const authenticated = (state) => {
  return state.token && state.user
};

export const AuthToken = (state) => {
  return state.token;

   //let token = localStorage.getItem('token');
   //return token;
};

export const userInfo = (state) => {
  return state.user;
};
