import * as db from "../db/fees.js";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
export function addFees(req, res) {
  const feeStructure = req.body;

  const [dbRes, err] = db.addFee(feeStructure);

  if (err) {
    return res.status(500).send({ status: "failed", error: err });
  }

  res.status(201).send({ status: "success", dbResult: dbRes });
}

/**
 *
 * @param {Request} _
 * @param {Response} res
 */
export function allFeesStructure(_, res) {
  const allFees = db.getAllFeeStructures();
  res.send(allFees);
}
