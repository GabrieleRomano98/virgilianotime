'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const dayjs = require('dayjs');
/* Data Access Object (DAO) module for accessing tasks and exams */

const sqlite = require('sqlite3');

// open the database
const db = require('./db');


// get colli
exports.listColli = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT C.id as codice, C.stato, C.lat, C.lng, C.Timestamp, U.name AS user FROM colli C, users U WHERE C.user = U.id';

    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const colli = rows.map(c => ({ codice: c.codice, stato: c.stato, lat: c.lat, lng: c.lng, Timestamp: c.Timestamp, user: c.user }));
      resolve(colli);
    });
  });
};

// Inserimento colli
exports.insertColli = (userId, colli, lat, lng, timestamp, stato) => {
  return new Promise((resolve, reject) => {
    
    let flag = true;
    const sql = colli.reduce(sql => {
      if(flag) {
        flag = false;
        return sql + "(?, ?, ?, ?, ?, ?)";
      }
      return sql + ", (?, ?, ?, ?, ?, ?)";
    }, "INSERT INTO colli VALUES ");

    const par = colli.reduce((v, collo) => [...v, collo, lat, lng, timestamp, stato, userId], []);

    db.run(sql, par, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};