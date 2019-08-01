import * as AuthAPI from "./auth";
import * as UserAPI from "./user";
import * as EncarteAPI from "./encarte";

export function GetAuthHeader() {
  return {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("authorization")
  };
}

export { AuthAPI, UserAPI,EncarteAPI };
