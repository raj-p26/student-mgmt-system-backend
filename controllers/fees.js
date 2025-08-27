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
export function addFeeStructure(req, res) {
  const feeStructure = req.body;

  const [dbRes, err] = db.addFeeStructure(feeStructure);

  if (err) {
    return res.status(500).send({ status: "failed", error: err });
  }

  res.status(201).send({ status: "success", dbResult: dbRes });
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export function allFeesStructure(req, res) {
  const stream = req.query["stream"];
  const semester = req.query["semester"];

  if (stream && semester) {
    const feeStructure = db.feeStructureBySemAndStream(semester, stream);
    return res.send(feeStructure);
  }

  const allFees = db.getAllFeeStructures();
  res.send(allFees);
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export function deleteFeeStructureByID(req, res) {
  const feeStructureID = req.params["id"];
  const [deleted, err] = db.deleteFeeStructure(feeStructureID);

  if (err !== null) {
    return res.status(500).send({ status: "failed", error: err });
  }

  if (!deleted) {
    return res
      .status(409)
      .send({ status: "failed", error: "Record not found" });
  }

  res.status(204).send({});
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export function updateFeeStructureByID(req, res) {
  const feeStructureID = req.params["id"];
  const feeStructureData = req.body;

  const [updated, err] = db.updateFeeStructure(
    Object.values(feeStructureData),
    feeStructureID
  );

  if (err !== null || !updated) {
    return res.status(500).send({ status: "failed", error: err });
  }

  res.status(204).send({ status: "success", message: "Updated successfully" });
}
