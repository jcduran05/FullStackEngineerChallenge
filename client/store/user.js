import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const GET_ALL_USERS = "GET_ALL_USERS";
const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
const REMOVE_USER = "REMOVE_USER";

/**
 * INITIAL STATE
 */
const defaultUser = {};
const defaultUsers = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const getUsers = users => ({ type: GET_ALL_USERS, users });
const removeUser = () => ({ type: REMOVE_USER });
const deleteUserSuccess = user => ({ type: DELETE_USER_SUCCESS, user });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = user => async dispatch => {
  try {
    await axios.delete(`/api/admin/users/delete/${user.id}`);
    dispatch(deleteUserSuccess(user));
    history.push("/home");
  } catch (err) {
    console.error(err);
  }
};

export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get("/api/users");
    return dispatch(getUsers(res.data || defaultUsers));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push("/home");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};

export const usersReducer = (state = defaultUsers, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    case DELETE_USER_SUCCESS:
      const newUsersState = Object.assign([], state);
      const indexOfUserToDelete = state.findIndex((user, idx) => {
        if (user.id == action.user.id) return idx;
      });
      newUsersState.splice(indexOfUserToDelete, 1);
      return newUsersState;
    default:
      return state;
  }
};
