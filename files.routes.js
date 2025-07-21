// const db = require("./db");
import * as db from "./db.js";
import fs from "node:fs";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function uploadDoc(req, res) {
  if (req.files.length === 0) {
    return res.status(400).send({ status: "failed", error: "no docs" });
  }
  // console.log(req.files[0]);
  // const studentID = req.headers["uuid"];
  // if (!fs.existsSync(`uploads/student-${studentID}`)) {
  //   fs.mkdirSync(`uploads/student-${studentID}`, { recursive: true });
  // }

  res.send({ status: "success" });
}

/**
 * @deprecated
 * @param {Request} req request object
 * @param {Response} res response object
 */
export function getImage(req, res) {
  db.getStudentImage(req.params.id)
    .then((path) => res.send({ status: "success", path }))
    .catch((err) => {
      let status = 404;
      if (err !== "Not Found") status = 500;

      res.status(status).send({ status: "failed", err });
    });
}
