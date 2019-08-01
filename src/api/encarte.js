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
