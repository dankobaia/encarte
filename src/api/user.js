import { GetAuthHeader } from "./";

export async function GetUser() {
  let result = await fetch(process.env.REACT_APP_API_URL + "user/self", {
    method: "GET",
    headers: {
      ...GetAuthHeader()
    }
  });
  return result;
}

export async function GetAllUsers() {
  let result = await fetch(process.env.REACT_APP_API_URL + "user/", {
    method: "GET",
    headers: {
      ...GetAuthHeader()
    }
  });
  return result;
}

export async function CreateUser(user) {
  let result = await fetch(process.env.REACT_APP_API_URL + "user/", {
    method: "POST",
    headers: {
      ...GetAuthHeader()
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      name: user.name,
      document: user.document,
      admin: user.admin
    })
  });
  return result;
}

export async function UpdateUser(user) {
  let result = await fetch(process.env.REACT_APP_API_URL + "user/", {
    method: "PUT",
    headers: {
      ...GetAuthHeader()
    },
    body: JSON.stringify({
      public_id: user.public_id,
      email: user.email,
      password: user.password,
      name: user.name,
      document: user.document,
      admin: user.admin
    })
  });
  return result;
}
