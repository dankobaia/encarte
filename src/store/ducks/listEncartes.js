import { takeLatest, put, call } from "redux-saga/effects";

import { EncarteAPI } from "../../api";

export const Types = {
  GET_ENCARTES: "listEncartes/GET_ENCARTES",
  SET_ENCARTES: "listEncartes/SET_ENCARTES",
  REMOVE_ERROR: "REMOVE_ERROR"
};

const INITIAL_STATE = {
  encartes: []
};

export default function reducers(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.GET_ENCARTES:
      return { ...state, loading: true };
    case Types.SET_ENCARTES:
      return { ...state, loading: false, encartes: payload };
    case Types.REMOVE_ERROR:
      return { ...state, error: false, errorMessage: null };
    default:
      return state;
  }
}

export function GetEncartes() {
  return {
    type: Types.GET_ENCARTES
  };
}

export function removeError() {
  return {
    type: Types.REMOVE_ERROR
  };
}

function* getEncartes() {
  var response = yield call(EncarteAPI.GetEncartes);
  let result = yield response.json();
  if (response.ok) {
    yield put({ type: Types.SET_ENCARTES, payload: result.data });
  }
}

export const sagas = [takeLatest(Types.GET_ENCARTES, getEncartes)];
