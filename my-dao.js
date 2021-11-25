'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

// open the database
const db = require('./db');

const milliseconds = day => 60*60*1000*day.get('hour') + 60*1000*day.get('minute') + 1000*day.get('second') + day.get('millisecond');

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
      const time = rows[0].time;
      resolve({time: Number(time) - milliseconds(dayjs())});
    });
  });
};

// Insert new time
exports.addTime = (code) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO times VALUES(?, ?)", [milliseconds(dayjs()), code], function (err) {
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

// Insert new session
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