const db = require("./db");

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
function addStudent(req, res) {
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
async function getStudents(_, res) {
  return db
    .allStudents()
    .then((records) => res.send({ status: "success", students: records }))
    .catch((e) => {
      console.log(e);
      res.status(500).send({ error: e, status: "failed" });
    });
}

/**
 * @deprecated No need of this function.
 * TODO: Remove this function.
 * Maybe I'm too lazy to remove it by this time.
 *
 * @param {Request} _ request object
 * @param {Response} res response object
 */
async function getStudentIDs(_, res) {
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
async function studentByID(req, res) {
  const id = req.params.id;

  db.getStudentByID(id)
    .then((student) => {
      res.send({ student, status: "success" });
    })
    .catch((e) => {
      let statusCode = e === "Not Found" ? 400 : 500;
      res.status(statusCode).send({ error: e, status: "failed" });
    });
}

/**
 * @param {Request} _ request object
 * @param {Response} res response object
 */
function getLastGR(_, res) {
  db.getLastGRFromDB()
    .then((gr) => res.send({ gr, status: "success" }))
    .catch((err) => res.status(500).send({ status: "failed", err }));
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
function getLastSerial(req, res) {
  db.lastSerial(req.params.doc_type)
    .then((serial) => res.send({ status: "success", serial }))
    .catch((err) => res.status(500).send({ status: "failed", err }));
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
function incSerial(req, res) {
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
function hasDocument(req, res) {
  db.hasDocument(req.params.id, req.params.doc_type)
    .then((exists) => res.send({ status: "ok", exists }))
    .catch((err) => res.status(500).send({ status: "failed", err }));
}

module.exports = {
  addStudent,
  getStudents,
  studentByID,
  getStudentIDs,
  getLastGR,
  getLastSerial,
  incSerial,
  hasDocument,
};
