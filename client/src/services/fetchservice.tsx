import UserFront from "@userfront/react";

function fetchAuth(path: string, callback: any) {
  fetch(path, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + UserFront.accessToken(),
    },
  })
    .then((res) => res.json())
    .then((data) => callback(data));
}

function postAuth(path: string, payload: Object | null, callback: any) {
  fetch(path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + UserFront.accessToken(),
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => callback(data));
}

const exportAll = { fetchAuth, postAuth };
export default exportAll;
