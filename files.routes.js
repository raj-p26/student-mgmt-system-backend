// const db = require("./db");
import * as db from "./db.js";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */

/**
 * @param {Request} _ request object
 * @param {Response} res response object
 */
function uploadDoc(_, res) {
  res.send({ status: "success" });
}

/**
 * @param {Request} req request object
 * @param {Response} res response object
 */
function getImage(req, res) {
  db.getStudentImage(req.params.id)
    .then((path) => res.send({ status: "success", path }))
    .catch((err) => {
      let status = 404;
      if (err !== "Not Found") status = 500;

      res.status(status).send({ status: "failed", err });
    });
}

module.exports = {
  uploadDoc,
  getImage,
};
