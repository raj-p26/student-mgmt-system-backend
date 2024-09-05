import * as db from "./db.js";
import { validationResult } from "express-validator";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function addStudent(req, res) {
  const errors = validationResult(req);
  // TODO: send uuid to db method for insert query
  // console.log(req.uuid);

  if (!req.files) {
    return res.status(400).json({ message: "No files" });
  }

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const files = {};

  for (const fieldName in req.files) {
    const file = req.files[fieldName][0];
    files[fieldName] = file.path;
  }

  req.body.id = req.uuid;
  console.log({ ...req.body, ...files });

  const [rowsAffected, err] = db.insertStudent({ ...req.body, ...files });

  if (err != null) {
    res.send({ status: "failed", message: err });
  }

  res.send({ todo: "Add students", rowsAffected });
}

/**
 * @param {Request} _ request object
 * @param {Response} res response object
 */
export function getStudents(_, res) {
  res.send({ todo: "display students" });
}
