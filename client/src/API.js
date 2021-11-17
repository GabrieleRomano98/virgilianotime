/**
 * All the API calls
 */

const BASEURL = '/api';

// Task API //

async function getColli() {
  // call: GET /api/operatore/colli
  const b = await fetch('https://tranquil-earth-17406.herokuapp.com/api/prova');
  console.log(b)
  const response = await fetch(BASEURL + '/operatore/colli');
  const tasksJson = await response.json();
  if (response.ok) {
    return tasksJson.map(c => ({codice: c.codice, stato: c.stato, lat: c.lat, lng: c.lng, Timestamp: c.Timestamp, user: c.user}));
  } else {
    throw tasksJson;  // an object with the error coming from the server
  }
}

function inviaColli(colli, lat, lng, timestamp, stato) {
  // call: POST /api/autista/colli
  return new Promise((resolve, reject) => {
    fetch(BASEURL + '/autista/colli', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({colli: colli, lat: lat, lng: lng, timestamp: timestamp, stato: stato})
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}


// User API //

async function logIn(credentials) {console.log(23);
  let response = await fetch(BASEURL + '/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    }
    catch(err) {
      throw err;
    }
  }
}

async function logOut() {
  await fetch(BASEURL + '/sessions/current', { method: 'DELETE' });
}

async function getUserInfo() {
  const response = await fetch(BASEURL + '/sessions/current');
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}

const API = {getColli, inviaColli, logIn, logOut, getUserInfo};
export default API;