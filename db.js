import queries from "./utils/queries.json" with { type: "json"};
import { DB_NAME } from "./utils/config.js";
import Database from "better-sqlite3";

if (DB_NAME == undefined) {
  console.log("DB_NAME must be set in .env file");
  process.exit(1);
}

const db = new Database(DB_NAME);

/** @returns {string | null} any errors occured from db */
export function insertStudent(student) {
  try {
    let dbResult = db.prepare(queries.insertStudent).run([
      student.name,
      student.whatsapp_no,
      student.enrollment_no,
      student.email,
      student.birth_date,
      student.gender,
      student.address,
      student.pincode,
      student.city,
      student.caste,
      student.taluka,
      student.district,
      student.abc_id,
      student.aadhar_number,
      student.exam_name,
      student.last_studied_year,
      student.seat_number,
      student.last_organization_studied_from,
      student.is_disabled,
      student.stream,
      student.semester,
      student.main_subject,
      student.parent_contact_no,
      student.institute_type,
      student.batch_year
    ]);

    if (!dbResult) throw new Error("DB Result empty");

    return null;
  } catch (err) {
    return err;
  }
}

export function allStudents() {
  try {
    const results = db.prepare(queries.selectAllNew).all();
    return results;
  } catch {
    return null;
  }
}

/**
 * Returns either student or error.
 * @param {string} id ID of the student
 */
export function getStudentByID(id) {
  try {
    let student = db.prepare(queries.selectByID).get(id);

    if (!student) throw new Error();

    return student;
  } catch {
    return null;
  }
}

/**
 * @deprecated
 */
export function getStudentIDs() {
  try {
    let studentIDs = db.prepare(queries.selectIDs).all();

    return studentIDs;
  } catch {
    return null;
  }
}

/**
 * @param {string} id id of the student
 * @returns {[boolean, string | null]} returns [false, error] if record deleted. [true, null] otherwise
 */
export function deleteStudentByID(id) {
  try {
    const result = db.prepare(queries.deleteByID).run(id);
    if (result.changes === 0) throw new Error("No changes");
    return [true, null];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
}

export function getLastGRFromDB() {
  try {
    const result = db.prepare(queries.lastGR).get();

    if (result) return result;

    return 0;
  } catch (err) {
    console.log(err);
    return -1;
  }
}

/**
 * @param {string} docType document type
 */
export function lastSerial(docType) {
  try {
    const query = queries[`last_${docType}_Serial`];
    if (query === undefined) throw new Error("invalid document type");

    let result = db.prepare(query).get();

    if (result !== undefined) {
      return result.serial_number || 0;
    } else {
      return 0;
    }
  } catch (err) {
    return 0;
  }
}

/**
 * @param {string} uuid uuid of the student
 * @param {string} docName name of the document
 * @param {string} docType type of the document
 * @returns Some sort of promise. :)
 */
export function incrementSerial(uuid, docName, docType) {
  try {
    const query = queries[`increment_${docType}_Serial`];
    if (query === undefined) throw new Error("Invalid document Type");
    let result = db.prepare(query).run(docName, uuid);

    if (!result) throw new Error("Not Found");
    return ["done", null];
  } catch (err) {
    console.log(err);
    return [null, err];
  }
}

/**
 * @param {string} uuid student's UUID
 * @param {string} docType type of the document
 * @returns {number | null} exists or not
 */
export function hasDocument(uuid, docType) {
  try {
    const query = queries[`has_${docType}`];
    if (query === undefined) throw new Error("Not valid document");

    const result = db.prepare(query).get(uuid);
    return result.exists_;
  } catch (err) {
    console.error("error", err);
    return null;
  }
}

export function updateStudent(student, id) {
  try {
    const result = db
      .prepare(queries.updateStudent)
      .run([
        student.Name,
        student.Mobile_No,
        student.Enrollment_No,
        student.Email,
        student.DOB,
        student.Gender,
        student.Address,
        student.Pin_No,
        student.City,
        student.Category,
        student.Taluka,
        student.District,
        student.ABCID,
        student.AadharCard_No,
        student.Exam_Name,
        student.Passing_Year,
        student.Seat_Number,
        student.School_College,
        student.is_disabled,
        student.stream,
        student.semester,
        student.main_subject,
        student.parent_contact_no,
        student.institute_type,
        student.batch_year,
        id
      ]);

    return [result.changes, null];
  } catch (err) {
    console.log(err);
    return [null, err];
  }
}

/// To be tested
/** @param {string} id */
export function getStudentImage(id) {
  try {
    const result = db.prepare(queries.getImage).get(id);
    console.log(result);
  } catch (err) {
    console.log(err);
    return err;
  }
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
export function adminExists(username, password) {
  try {
    const result = db.prepare(queries.adminCreds).get(username, password);
    return result.exists_ !== 0;
  } catch (err) {
    console.log(err);
    return err;
  }
}

/**
 * @param {string} id id of the student
 */
export function docID(id) {
  return db.prepare(queries.getDocByID).get(id);
}

export function insertUsingCSVData(values) {
  try {
    values.forEach((val) => {
      let cols = Object.keys(val).join(", ");
      let params = Object.values(val).fill("?").join(", ");
      let query = `INSERT INTO students (${cols}) VALUES (${params})`;

      db.prepare(query).run(Object.values(val));
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}
