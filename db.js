const mysql = require("mysql");
const queries = require("./utils/queries.json");
const dotenv = require("dotenv");

dotenv.config();

const DB_NAME = process.env.DB_NAME;

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
    conn.query(queries.lastGRQuery, function (err, results) {
      if (err != null) {
        reject(err.sqlMessage);
      } else {
        resolve(results[0].gr_no);
      }
    });
  });
}

module.exports = {
  insertStudent,
  allStudents,
  getStudentByID,
  getStudentIDs,
  getLastGRFromDB,
};
