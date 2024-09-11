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
      user: "root",
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
    tertiary_secondary_subject, student_gender, email,
    contact_no, whatsapp_no, surname, name, fathername,
    father_name, mother_name, address,
    city, district, pincode, birth_date, birth_place, caste,
    parent_contact_no,
    last_organization_studied_from, last_studied_year,
    elective_course, student_image
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?
  );
`;

const allStudentsQuery = `SELECT * FROM student_records;`;

/** @returns {string | null} returns any errors occured from db */
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
      student.gender,
      student.email,
      student.contact_no,
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
      if (err != null) {
        console.log(err.sqlMessage);
        return err.sqlMessage;
      }

      return null;
    }
  );

  conn.end();
}

function allStudents() {
  const [conn, err] = initDb();
  if (err != null) {
    return new Promise((_, reject) => reject(err));
  }

  return new Promise((resolve, reject) => {
    conn.query(allStudentsQuery, function (err, results) {
      if (err != null) {
        reject(err.sqlMessage);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  insertStudent,
  allStudents,
};
