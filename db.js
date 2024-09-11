const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

const DB_NAME = process.env.DB_NAME;

if (DB_NAME == undefined) {
  console.log("Ain't no way DB_URL is not set in .env");
  process.exit(1);
}

/** @returns {[mysql.Connection | null, string | null]} */
function initDb() {
  try {
    const conn = mysql.createConnection({
      host: "localhost",
      username: "root",
      password: "",
      database: DB_NAME,
    });

    return [conn, null];
  } catch (e) {
    return [null, e.toString()];
  }
}

const insertQuery = `
  INSERT INTO student_records(
    id, enrollment_no, abc_id, gr_no, aadhar_number,
    stream, semester, main_course, first_secondary_subject,
    tertiary_secondary_subject, bonafide_doc,
    tc_doc, no_objection_doc, first_trial_doc,
    student_gender, email, contact_no,
    whatsapp_no, fee_recipt_print, full_name, address,
    city, district, pincode, birth_date, birth_place, caste,
    full_name_of_parent, parent_contact_no,
    last_organization_studied_from, last_studied_year,
    elective_course, student_image
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?
  );
`;

const allStudentsQuery = `SELECT * FROM student_records;`;

/** @returns {string | null} */
function insertStudent(student) {
  const [conn, err] = initDb();
  if (err != null) {
    return err;
  }

  conn.query(
    insertQuery,
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
      student.bonafide_doc,
      student.tc_doc,
      student.no_objection_doc,
      student.first_trial_doc,
      student.gender,
      student.email,
      student.contact_no,
      student.wh_no,
      student.fee_recipt_print,
      student.full_name,
      student.address,
      student.city,
      student.district,
      student.pincode,
      student.birth_date,
      student.birth_place,
      student.caste,
      student.full_name_of_parent,
      student.parent_no,
      student.last_organization_studied_from,
      student.last_studied_year,
      student.elective_course,
      student.studentimg,
    ],
    (err, _results, _fields) => {
      if (err != null) {
        return err.message;
      }

      return null;
    }
  );
}

function allStudents() {
  const [conn, err] = initDb();
  if (err != null) {
    return err;
  }

  conn.query(allStudentsQuery, function (err, results, fields) {
    console.table(fields);

    if (err != null) {
      return err.sqlMessage;
    }

    return results;
  });
}

module.exports = {
  insertStudent,
  allStudents,
};
