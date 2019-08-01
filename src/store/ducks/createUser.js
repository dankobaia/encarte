import { takeLatest, put, call } from "redux-saga/effects";
import { UserAPI } from "../../api";
import { Types as ListTypes } from "./listUsers";

export const Types = {
  CREATE: "user/CREATE",
  CREATE_SUCCESS: "user/CREATE_SUCCESS",
  CREATE_ERROR: "user/CREATE_ERROR",
  UPDATE: "user/UPDATE",
  UPDATE_SUCCESS: "user/UPDATE_SUCCESS",
  FILL_EDIT: "user/FILL_EDIT",
  EDIT: "user/EDIT",
  EDIT_CLEAR: "user/EDIT_CLEAR",
  REMOVE_ERROR: "REMOVE_ERROR",
  REMOVE_SUCCESS: "REMOVE_SUCCESS"
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  successMesssage: null,
  error: false,
  errorMessage: null
};

export default function reducers(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.CREATE:
      return { ...state, loading: true };
    case Types.UPDATE:
      return { ...state, loading: true };
    case Types.EDIT:
      return { ...state, editing: payload };
    case Types.EDIT_CLEAR:
      return { ...INITIAL_STATE };
    case Types.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        successMessage: "The user was successfully registered!"
      };
    case Types.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        successMessage: "The user was successfully updated!"
      };
    case Types.CREATE_ERROR:
      return {
        ...INITIAL_STATE,
        loading: false,
        error: true,
        errorMessage: payload.message
      };
    case Types.REMOVE_ERROR:
      return { ...state, error: false, errorMessage: null };
    case Types.REMOVE_SUCCESS:
      return { ...state, success: false, successMesssage: null };
    default:
      return state;
  }
}

export function createUser(user) {
  return {
    type: Types.CREATE,
    payload: user
  };
}

export function updateUser(user) {
  return {
    type: Types.UPDATE,
    payload: user
  };
}

export function editUser(edit) {
  return {
    type: Types.EDIT,
    payload: edit
  };
}
export function editUserClear() {
  return {
    type: Types.EDIT_CLEAR
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

function* createRequest(action) {
  let { payload } = action;
  var response = yield call(UserAPI.CreateUser, payload);
  if (response.ok) {
    //update userlist
    yield put({ type: ListTypes.GET_USERS });
    yield put({ type: Types.CREATE_SUCCESS });
  } else {
    let result = yield response.json();
    yield put({ type: Types.CREATE_ERROR, payload: result });
  }
}

function* updateRequest(action) {
  let { payload } = action;
  var response = yield call(UserAPI.UpdateUser, payload);
  if (response.ok) {
    //update userlist
    yield put({ type: ListTypes.GET_USERS });
    yield put({ type: Types.UPDATE_SUCCESS });
    yield put({ type: Types.EDIT_CLEAR });
  } else {
    let result = yield response.json();
    yield put({ type: Types.CREATE_ERROR, payload: result });
  }
}

export const sagas = [
  takeLatest(Types.CREATE, createRequest),
  takeLatest(Types.UPDATE, updateRequest)
];
