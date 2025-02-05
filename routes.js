import * as db from "./db.js";
import fs from "node:fs";
import csv from "csv-parser";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function addStudent(req, res) {
  if (!req.files) {
    return res.status(400).json({ message: "No files" });
  }

  const files = {};

  for (const fieldName in req.files) {
    const file = req.files[fieldName][0];
    files[fieldName] = file.path;
  }

  req.body.id = req.headers.uuid;

  const err = db.insertStudent({ ...req.body, ...files });

  if (err != null) {
    return res.status(500).send({ status: "failed", message: err });
  }

  res.send({ uuid: req.headers.uuid, status: "success" });
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
      res.send({student});
  } else {
      res.status(404).send({message: "Not Found"});
  }
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
  const serial = db.lastSerial(req.params.doc_type)

  res.send({ status: "success", serial });
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function incSerial(req, res) {
  db.incrementSerial(
    req.headers.uuid,
    req.headers.docname,
    req.headers.doc_type
  )
    .then((val) => res.send({ status: "success", message: val }))
    .catch((err) => res.status(500).send({ status: "failed", message: err }));
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function hasDocument(req, res) {
  let exists = db.hasDocument(req.params.id, req.params.doc_type)

  res.send({exists});
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function updateStudent(req, res) {
  let student = { ...req.body };

  db.updateStudent(student, req.params.id)
    .then((result) => res.send({ result }))
    .catch((err) => res.status(500).send({ err }));
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
    fs.writeFileSync("upload.csv", values);
    const results = [];

    fs.createReadStream("upload.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
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
