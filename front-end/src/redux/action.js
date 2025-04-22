export const SET_USER_DATA = 'SET_USER_DATA';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export const setUserData = (payload) => ({
  type: SET_USER_DATA,
  payload,
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});
