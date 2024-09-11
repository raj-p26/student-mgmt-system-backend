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
    res.status(500).send({ status: "failed", message: err });
  }

  res.send({ uuid: req.uuid });
}

/**
 * Returns all records.
 *
 * @param {Request} _ request object
 * @param {Response} res response object
 */
async function getStudents(_, res) {
  const records = await db
    .allStudents()
    .catch((e) => res.status(500).send({ error: e }));

  res.send({ students: records });
}

module.exports = {
  addStudent,
  getStudents,
};
