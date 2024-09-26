const mysql = require("mysql");
const queries = require("./utils/queries.json");
const config = require("./utils/config");

const DB_NAME = config.DB_NAME;

if (DB_NAME == undefined) {
  console.log("Ain't no way DB_URL is not set in .env");
  process.exit(1);
}

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: DB_NAME,
});

/** @returns {string | null} any errors occured from db */
function insertStudent(student) {
  conn.query(
    queries.insertStudent,
    [
      student.id,
      student.enrollment_no,
      student.abc_id,
      student.gr_no,
      student.aadhar_number,
      student.stream,
      student.semester,
      student.main_course,
      student.first_secondary_subject,
      student.tertiary_secondary_subject,
      student.gender,
      student.email,
      student.wh_no,
      student.surname,
      student.name,
      student.fathername,
      student.father_name,
      student.mother_name,
      student.address,
      student.city,
      student.district,
      student.pincode,
      student.birth_date,
      student.birth_place,
      student.caste,
      student.parent_no,
      student.last_organization_studied_from,
      student.last_studied_year,
      student.elective_course,
      student.studentimg,
    ],
    (err, _results, _fields) => {
      if (err != null || err != undefined) {
        console.log(err.sqlMessage);
        return err.sqlMessage;
      }

      return null;
    }
  );
}

function allStudents() {
  return new Promise((resolve, reject) => {
    conn.query(queries.selectAll, function (err, results) {
      if (err != null) {
        reject(err.sqlMessage);
      } else {
        resolve(results);
      }
    });
  });
}

/**
 * Returns either student or error.
 * @param {string} id ID of the student
 */
function getStudentByID(id) {
  return new Promise((resolve, reject) => {
    conn.query(queries.selectByID, [id], function (err, results, _fields) {
      if (err != null) {
        reject(err);
      } else if (results[0] == undefined) {
        reject("Not Found");
      } else {
        resolve(results[0]);
      }
    });
  });
}

function getStudentIDs() {
  return new Promise((resolve, reject) => {
    conn.query(queries.selectIDs, function (err, results) {
      if (err != null) {
        reject(err.sqlMessage);
      } else {
        resolve(results);
      }
    });
  });
}

function getLastGRFromDB() {
  return new Promise((resolve, reject) => {
    conn.query(queries.lastGR, function (err, results) {
      if (err != null) {
        reject(err.sqlMessage);
      } else {
        results.length === 0 ? resolve("") : resolve(results[0].gr_no || "");
      }
    });
  });
}

/**
 * returns promise containing last serial number of any given document.
 * @param {string} docType document type
 */
function lastSerial(docType) {
  return new Promise((res, rej) => {
    const query = queries[`last_${docType}_Serial`];
    if (query === undefined) rej("invalid document type");

    conn.query(query, (err, results) => {
      if (err != null) {
        rej(err.sqlMessage);
      } else {
        results.length === 0 ? res("") : res(results[0].serial_number || "");
      }
    });
  });
}

/**
 * @param {string} uuid uuid of the student
 * @param {string} docName name of the document
 * @param {string} docType type of the document
 * @returns idk, man. Figure out on your own.
 */
function incrementSerial(uuid, docName, docType) {
  return new Promise((res, rej) => {
    const query = queries[`increment_${docType}_Serial`];
    if (query === undefined) rej("Invalid document Type");

    conn.query(query, [docName, uuid], (err) => {
      err != null ? rej(err) : res("done");
    });
  });
}

module.exports = {
  insertStudent,
  allStudents,
  getStudentByID,
  getStudentIDs,
  getLastGRFromDB,
  getLastTCSerial,
  lastSerial,
  incrementSerial,
};
