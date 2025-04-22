import { SET_USER_DATA, CLEAR_USER_DATA } from './action';

const initialState = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  role: null,
  lastLogin: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };
    case CLEAR_USER_DATA:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
