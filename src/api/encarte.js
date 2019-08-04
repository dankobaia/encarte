import { GetAuthHeader } from "./";

export async function Create(encarte) {
  console.log(encarte);
  let result = await fetch(process.env.REACT_APP_API_URL + "encarte/", {
    method: "POST",
    headers: {
      ...GetAuthHeader()
    },
    body: JSON.stringify({
      user_id: encarte.public_id,
      image: encarte.image,
      start_date: encarte.start_date,
      end_date: encarte.end_date,
      brand_id: encarte.brand_id
    })
  });
  return result;
}

export async function GetEncartes() {
  let result = await fetch(process.env.REACT_APP_API_URL + "encarte/", {
    headers: {
      ...GetAuthHeader()
    }
  });
  return result;
}

export const options = [
  {
    value: "id_guanabara",
    label: "Guanabara",
    thumb: "https://via.placeholder.com/300x300"
  },
  {
    value: "id_extra",
    label: "Extra",
    thumb: "https://via.placeholder.com/300x300"
  },
  {
    value: "id_sm",
    label: "Super Market",
    thumb: "https://via.placeholder.com/300x300"
  }
];
