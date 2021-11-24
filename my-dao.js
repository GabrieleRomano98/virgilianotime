'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const sqlite = require('sqlite3');

// open the database
const db = require('./db');


// get time
exports.getTime = (code) => {
  return new Promise((resolve, reject) => {

    db.all("SELECT time FROM times WHERE session = ?", [code], (err, rows) => {
      if (err || !rows.length) {
        reject(err);
        return;
      }
      db.run("DELETE FROM times WHERE session = ?", [code], err => '');
      db.run("DELETE FROM sessions WHERE session = ?", [code], err => '');
      console.log(rows)
      const time = rows[0].time;
      resolve({time: time});
    });
  });
};

// Insert new time
exports.addTime = (time, code) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO times VALUES(?, ?)", [time, code], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// get session
exports.getSession = (code) => {
  return new Promise((resolve, reject) => {

    db.all("SELECT ? IN (SELECT session FROM sessions) AS session", [code], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const session = rows[0].session;
      resolve({session: session});
    });
  });
};

// Insert new time
exports.addSession = (code) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO sessions VALUES(?)", [code], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};