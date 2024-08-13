// export async function sendGetPageRequest(url, limit = 0, offset = 0) {
//   return new Promise(function (resolve, reject) {
//     fetch(url + "?limit=" + limit + "&offset=" + offset, {
//       method: "GET",
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         error = new Error();
//         error.code = response.status;
//         return response.text().then((text) => {
//           error.message = text;
//           throw error;
//         });
//       })
//       .then((jsonArr) => {
//         return resolve(jsonArr);
//       })
//       .catch((error) => {
//         return reject(error);
//       });
//   });
// }

export async function sendRequest(method, url, body = null) {
  return new Promise(function (resolve, rejected) {
    const headers = {
      "Content-Type": "application/json",
    };
    fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        let error = new Error();
        error.code = response.status;
        return response.text().then((text) => {
          error.message = text;
          throw error;
        });
      })
      .then((json) => {
        return resolve(json);
      })
      .catch((error) => {
        return rejected(error);
      });
  });
}

export async function sendGetRequest(url) {
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        error = new Error();
        error.code = response.status;
        return response.text().then((text) => {
          error.message = text;
          throw error;
        });
      })
      .then((jsonArr) => {
        return resolve(jsonArr);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}
