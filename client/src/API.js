const BASEURL = '/api';

async function getTime(code) {
  // call: GET /api/time/:code
  const response = await fetch(BASEURL + '/time/' + code);
  const startTime = await response.json();
  if (response.ok) {
    return startTime;
  } else {
    throw startTime;  // an object with the error coming from the server
  }
}

function addTime(code) {
	// call: POST /api/time/:code
	return new Promise((resolve, reject) => {
		fetch(BASEURL + '/time/' + code, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}
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

async function getSession(code) {
	// call: GET /api/session/:code
	const response = await fetch(BASEURL + '/session/' + code);
	const session = await response.json();
	if (response.ok) {
	  return session.session;
	} else {
	  throw session;  // an object with the error coming from the server
	}
  }
  
  function addSession(code) {
	  // call: POST /api/session/:code
	  return new Promise((resolve, reject) => {
		  fetch(BASEURL + '/session/' + code, {
		  method: 'POST',
		  headers: {
			  'Content-Type': 'application/json',
		  }
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

const API = { getTime, addTime, getSession, addSession };
export default API;