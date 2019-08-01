import { takeLatest, put, call } from "redux-saga/effects";

import { AuthAPI, UserAPI } from "../../api";
import storage from "redux-persist/lib/storage";

export const Types = {
  ASYNC_LOGIN: "auth/ASYNC_LOGIN",
  LOGIN_SUCCESS: "auth/LOGIN_SUCCESS",
  LOGIN_ERROR: "auth/LOGIN_ERROR",
  ADD_USER_DATA: "auth/ADD_USER_DATA",
  LOGOUT: "auth/LOGOUT",
  REMOVE_ERROR: "REMOVE_ERROR"
};

const INITIAL_STATE = {
  user: null,
  email: null,
  admin: false,
  loading: false,
  error: false,
  errorMessage: null
};

export default function reducers(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.ASYNC_LOGIN:
      return { ...state, loading: true };
    case Types.LOGOUT:
      storage.removeItem("authorization");
      return { INITIAL_STATE };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.data.public_id,
        email: payload.data.email,
        admin: payload.data.admin
      };
    case Types.LOGIN_ERROR:
      return {
        ...INITIAL_STATE,
        loading: false,
        error: true,
        errorMessage: payload.message
      };
    case Types.REMOVE_ERROR:
      return { ...state, error: false, errorMessage: null };
    default:
      return state;
  }
}

export function login(email, password) {
  return {
    type: Types.ASYNC_LOGIN,
    payload: {
      email,
      password
    }
  };
}

export function logout() {
  return {
    type: Types.LOGOUT
  };
}

export function removeError() {
  return {
    type: Types.REMOVE_ERROR
  };
}

function* authRequest(action) {
  let { payload } = action;
  var response = yield call(AuthAPI.Login, payload.email, payload.password);
  let result = yield response.json();
  if (response.ok) {
    localStorage.setItem("authorization", result.Authorization);
    let userDateResponse = yield UserAPI.GetUser();
    let userResult = yield userDateResponse.json();
    if (userDateResponse.ok)
      yield put({ type: Types.LOGIN_SUCCESS, payload: userResult });
    else {
      localStorage.removeItem("authorization");
      yield put({ type: Types.LOGIN_ERROR, payload: userResult });
    }
  } else {
    localStorage.removeItem("authorization");
    yield put({ type: Types.LOGIN_ERROR, payload: result });
  }
}

export const sagas = [takeLatest(Types.ASYNC_LOGIN, authRequest)];
