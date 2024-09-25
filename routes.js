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
 * @deprecated
 * No need of this function.
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
      if (e === "Not Found") {
        res.status(404).send({ error: "Not Found", status: "failed" });
      } else {
        res.status(500).send({ error: e, status: "failed" });
      }
    });
}

/**
 * @param {Request} _ request object
 * @param {Response} res response object
 */
function getLastGR(_, res) {
  console.log("here");
  db.getLastGRFromDB()
    .then((gr) => res.send({ gr, status: "success" }))
    .catch((err) => res.status(500).send({ status: "failed", err }));
}

module.exports = {
  addStudent,
  getStudents,
  studentByID,
  getStudentIDs,
  getLastGR,
};
