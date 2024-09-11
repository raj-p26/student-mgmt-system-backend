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

  req.body.id = req.uuid;

  const err = db.insertStudent({ ...req.body, ...files });

  if (err != null) {
    res.send({ status: "failed", message: err });
  }

  res.send({ todo: "Add students", uuid: req.uuid });
}

/**
 * Returns all records.
 *
 * @param {Request} _ request object
 * @param {Response} res response object
 */
function getStudents(_, res) {
  const err = db.allStudents();

  if (err != null) {
    console.log(err);
  }
  res.send({ todo: "display students" });
}

module.exports = {
  addStudent,
  getStudents,
};
