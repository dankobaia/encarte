import { takeLatest, put, call } from "redux-saga/effects";
import { EncarteAPI } from "../../api";

export const Types = {
  UPLOAD: "upload_encarte/UPLOAD",
  UPLOAD_SUCCESS: "upload_encarte/UPLOAD_SUCCESS",
  UPLOAD_ERROR: "upload_encarte/UPLOAD_ERROR",
  REMOVE_SUCCESS: "upload_encarte/REMOVE_SUCCESS",
  REMOVE_ERROR: "upload_encarte/REMOVE_ERROR"
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  successMesssage: null,
  error: false,
  errorMessage: null,
  clearImage: false
};

export default function reducers(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.UPLOAD:
      return { ...state, loading: true };
    case Types.UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        successMessage: "The encarte was successfully registered!"
      };
    case Types.UPLOAD_ERROR:
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

export function uploadEncarte(
  public_id,
  image,
  start_date,
  end_date,
  brand_id
) {
  return {
    type: Types.UPLOAD,
    payload: {
      public_id,
      image,
      start_date,
      end_date,
      brand_id
    }
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

function* registerEncarte(action) {
  console.log("saga", action);
  if (
    action.payload.image.startsWith("data:image/jpeg;base64") ||
    action.payload.image.startsWith("data:image/png;base64")
  ) {
    let { payload } = action;
    var response = yield call(EncarteAPI.Create, payload);
    if (response.ok) {
      //update userlist
      yield put({ type: Types.UPLOAD_SUCCESS });
    } else {
      let result = yield response.json();
      yield put({ type: Types.UPLOAD_ERROR, payload: result });
    }
  } else {
    yield put({
      type: Types.UPLOAD_ERROR,
      payload: {
        message: "The image must be in png or jpg format"
      }
    });
  }
}

export const sagas = [takeLatest(Types.UPLOAD, registerEncarte)];
