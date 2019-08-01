import { all } from "redux-saga/effects";
import { sagas as AuthSagas } from "./ducks/auth";
import { sagas as CreateUserSagas } from "./ducks/createUser";
import { sagas as ListUsersSagas } from "./ducks/listUsers";
import { sagas as uploadEncarteSagas } from "./ducks/uploadEncarte";

export default function* root() {
  let sagas = [].concat(
    AuthSagas,
    CreateUserSagas,
    ListUsersSagas,
    uploadEncarteSagas
  );
  yield all(sagas);
}
