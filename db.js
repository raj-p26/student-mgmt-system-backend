const mysql = require("mysql");
const queries = require("./utils/queries.json");
const config = require("./utils/config");

const DB_NAME = config.DB_NAME;

if (DB_NAME == undefined) {
  console.log("Ain't no way DB_NAME is not set in .env");
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
      student.udisk_no,
      student.gr_no,
      student.aadhar_number,
      student.stream,
      student.semester,
      student.main_subject,
      student.first_secondary_subject,
      student.tertiary_secondary_subject,
      student.gender,
      student.email,
      student.whatsapp_no,
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
      student.parent_contact_no,
      student.last_organization_studied_from,
      student.last_studied_year,
      student.elective_course,
      student.studentimg,
      student.institute_type,
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

function allStudents(institute_type) {
  return new Promise((resolve, reject) => {
    conn.query(queries.selectAll, [institute_type], function (err, results) {
      if (err != null) {
        reject(err.sqlMessage);
      } else {
        // console.log(results);
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
        if (results.length === 0) {
          resolve(0);
        } else if (results[0].gr_no === "") {
          resolve(0);
        } else {
          let gr_no = results[0].gr_no;
          resolve(gr_no.split("-")[3]);
        }
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
 * @returns Some sort of promise. :)
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

/**
 * @param {string} uuid student's UUID
 * @param {string} docType type of the document
 */
function hasDocument(uuid, docType) {
  return new Promise((res, rej) => {
    const query = queries[`has_${docType}`];
    // console.log(query);
    if (query === undefined) rej("Not valid document");

    conn.query(query, [uuid], (err, results) => {
      if (err !== null) {
        console.log(err);
        rej(err);
      } else res(results[0].exists_ > 0);
    });
  });
}

function updateStudent(student, id) {
  return new Promise((res, rej) => {
    const query = queries.updateStudent;

    conn.query(
      query,
      [
        student.enrollment_no,
        student.abc_id,
        student.gr_no,
        student.udisk_no,
        student.aadhar_number,
        student.stream,
        student.semester,
        student.main_subject,
        student.first_secondary_subject,
        student.tertiary_secondary_subject,
        student.gender,
        student.email,
        student.whatsapp_no,
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
        student.parent_contact_no,
        student.last_organization_studied_from,
        student.last_studied_year,
        student.elective_course,
        id,
      ],
      (err, _results, _fields) => {
        if (err !== null) {
          rej(err.sqlMessage);
        } else {
          res("success");
        }
      }
    );
  });
}

/** @param {string} id */
function getStudentImage(id) {
  return new Promise((res, rej) => {
    conn.query(queries.getImage, [id], (err, results) => {
      if (err !== null) rej(err.sqlMessage);
      else if (results[0] === undefined) rej("Not Found");
      else res(results[0].student_image);
    });
  });
}

/**
 *
 * @param {string} username admin username
 * @param {string} password admin password
 */
function adminExists(username, password) {
  return new Promise((res, rej) => {
    conn.query(queries.adminCreds, [username, password], (err, results) => {
      if (err !== null) {
        rej(err.sqlMessage);
      } else if (results.length === 0) {
        rej("Invalid Credentials");
      } else {
        res(results[0].exists_);
      }
    });
  });
}

/**
 * @param {string} id id of the student
 */
function docID(id) {
  return new Promise((res, rej) => {
    conn.query(queries.getDocByID, [id], (err, results) => {
      if (err !== null) rej(err.sqlMessage);
      else res({ ...results[0] });
    });
  });
}

module.exports = {
  insertStudent,
  allStudents,
  getStudentByID,
  getStudentIDs,
  getLastGRFromDB,
  lastSerial,
  incrementSerial,
  hasDocument,
  updateStudent,
  getStudentImage,
  adminExists,
  docID,
};
