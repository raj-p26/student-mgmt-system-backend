import * as db from "./db.js";
import fs from "node:fs";
import csv from "csv-parser";
// import { v4 } from "uuid";

const STREAM = "bcom";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function addStudent(req, res) {
  const err = db.insertStudent({ ...req.body });

  if (err != null) {
    console.log(err);
    return res.status(500).send({ status: "failed", message: err });
  }

  res.send({ status: "success" });
}

/**
 * Returns all records.
 *
 * @param {Request} _ request object
 * @param {Response} res response object
 */
export async function getStudents(req, res) {
  try {
    const students = db.allStudents(req.params.type);
    res.send({ status: "success", students });
  } catch (e) {
    res.status(500).send({ error: e, status: "failed" });
  }
}

/**
 * @deprecated No need of this function.
 * TODO: Remove this function.
 * Maybe I'm too lazy to remove it by this time.
 *
 * @param {Request} _ request object
 * @param {Response} res response object
 */
export async function getStudentIDs(_, res) {
  db.getStudentIDs()
    .then((ids) => res.send({ ids, status: "success" }))
    .catch((err) => res.status(500).send({ status: "failed", err }));
}

/**
 * Returns record based on ID.
 *
 * @param {Request} req request object
 * @param {Response} res response object
 */
export async function studentByID(req, res) {
  const id = req.params.id;

  let student = db.getStudentByID(id);

  if (student) {
    res.send({ student });
  } else {
    res.status(404).send({ message: "Not Found" });
  }
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export async function deleteStudents(req, res) {
  const ids = req.body.ids;
  let err = null;
  let deleted = false;
  ids.forEach((id) => {
    [deleted, err] = db.deleteStudentByID(id);
  });
  res.send({ status: deleted ? "success" : "failed", error: err });
}

/**
 * @deprecated no need for this too
 *
 * @param {Request} _ request object
 * @param {Response} res response object
 */
export function getLastGR(_, res) {
  db.getLastGRFromDB();
  res.send({ status: "success" });
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function getLastSerial(req, res) {
  const serial = db.lastSerial(req.params.doc_type);

  res.send({ status: "success", serial });
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function incSerial(req, res) {
  let [result, err] = db.incrementSerial(
    req.headers.uuid,
    req.headers.docname,
    req.headers.doc_type
  );

  if (err !== null) {
    res.status(500).send({ status: "failed", message: err });
  } else {
    res.send({ status: "success", message: result });
  }
  // .then((val) => res.send({ status: "success", message: val }))
  // .catch((err) => res.status(500).send({ status: "failed", message: err }));
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function hasDocument(req, res) {
  let exists = db.hasDocument(req.params.id, req.params.doc_type);

  res.send({ exists });
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function updateStudent(req, res) {
  let student = { ...req.body };

  const [changes, err] = db.updateStudent(student, req.params.id);
  if (err) res.status(500).send({ status: "failed", error: err });
  else res.send({ status: "success", changes });
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function adminCredentials(req, res) {
  const name = req.body.username;
  const password = req.body.password;

  const result = db.adminExists(name, password);
  if (result === true) {
    res.send({ status: "success", exists: true });
  } else {
    res.status(401).send({ status: "failed" });
  }
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function getDocByID(req, res) {
  const docData = db.docID(req.params.id, req.params.docname);
  res.send({
    status: "success",
    docData,
  });
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function uploadCSV(req, res) {
  const values = req.files[0].buffer.toString();
  const stream = req.body["Stream"];
  const semester = req.body["semester"];
  const batchYear = req.body["batch_year"];
  const main_subject = req.body["main_subject"];

  fs.writeFileSync("upload.csv", values);
  const results = [];

  fs.createReadStream("upload.csv")
    .pipe(csv())
    .on("data", (data) =>
      results.push({
        ...data,
        stream,
        semester,
        batch_year: batchYear,
        main_subject,
      })
    )
    .on("finish", () => {
      db.insertUsingCSVData(results);
    });

  res.send({ status: "done" });
}

// module.exports = {
//   addStudent,
//   getStudents,
//   studentByID,
//   getStudentIDs,
//   getLastGR,
//   getLastSerial,
//   incSerial,
//   hasDocument,
//   updateStudent,
//   adminCredentials,
//   getDocByID,
// };
