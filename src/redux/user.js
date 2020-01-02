import {createReducer, createActions} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  updateUser: ['user'],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const defaultState = {
  user: {},
};

/* ------------- Reducers ------------- */

// const updateUser = (state, {user}) => ({
//   ...state,
//   user,
// });
const updateUser = (state, {user}) => {
  return {
    ...state,
    user,
  };
};

/* ---------------- Hookup Reducers to Types --------------- */

export const userReducer = createReducer(defaultState, {
  [Types.UPDATE_USER]: updateUser,
});
