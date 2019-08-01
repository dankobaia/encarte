import { takeLatest, put } from "redux-saga/effects";
import { UserAPI } from "../../api";

export const Types = {
  GET_USERS: "user/GET_USERS",
  GET_USERS_SUCCESS: "user/GET_USERS_SUCCESS",
  GET_USERS_ERROR: "user/GET_USERS_ERROR",

  REMOVE_ERROR: "REMOVE_ERROR",
  REMOVE_SUCCESS: "REMOVE_SUCCESS"
};

const INITIAL_STATE = {
  userlist: [],
  loading: false,
  success: false,
  successMessage: false,
  error: false,
  errorMessage: null
};

export default function reducers(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.GET_USERS:
      return { ...state, loading: true };
    case Types.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userlist: payload
      };
    case Types.GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload.message
      };

    case Types.REMOVE_ERROR:
      return { ...state, error: false, errorMessage: null };
    case Types.REMOVE_SUCCESS:
      return { ...state, success: false, successMessage: null };
    default:
      return state;
  }
}

export function getUsers() {
  return {
    type: Types.GET_USERS
  };
}

export function removeSuccess() {
  return {
    type: Types.REMOVE_SUCCESS
  };
}

export function removeError() {
  return {
    type: Types.REMOVE_ERROR
  };
}

function* getUserRequest(action) {
  var response = yield UserAPI.GetAllUsers();
  let result = yield response.json();
  if (response.ok) {
    //update userlist
    yield put({ type: Types.GET_USERS_SUCCESS, payload: result.data });
  } else {
    yield put({ type: Types.GET_USERS_ERROR, payload: result });
  }
}

export const sagas = [takeLatest(Types.GET_USERS, getUserRequest)];
