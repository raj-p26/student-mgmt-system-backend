import Database from "better-sqlite3";
import queries from "../utils/queries.json" with { type: "json" };

import { DB_NAME } from "../utils/config.js";

if (!DB_NAME) throw new Error("DB_NAME not set in .env");

const db = new Database(DB_NAME);

/**
 * 
 * @param {any} feeData 
 * @returns {[
 *  { lastInsertedRowid: number | bigint; changes: number; } | null,
 *  string | null
 * ]}
 */
export function addFeeStructure(feeData) {
  const values = Object.values(feeData);

  try {
    const structure = db
      .prepare(queries.getFeeStructureBySemAndStream)
      .get(feeData["semester"], feeData["stream"]);

    if (structure !== undefined) return [null, "record exists"];

    const result = db.prepare(queries.addFee).run(values);
    return [result, null];
  } catch (e) {
    console.error(e);
    return [null, e];
  }
}

export function getAllFeeStructures() {
  return db.prepare(queries.allFees).all();
}

/**
 * @param {string} feeID
 * @returns {[boolean | null, string | null]}
 */
export function deleteFeeStructure(feeID) {
  try {
    const dbResult = db.prepare(queries.deleteFeeStructureByID).run(feeID);
    return [dbResult.changes !== 0, null];
  } catch (e) {
    return [null, e];
  }
}

/**
 * @param {string[]} feeStructure
 * @param {string} id
 * @returns {[boolean, string | null]}
 */

export function updateFeeStructure(feeStructure, id) {
  try {
    const res = db.prepare(queries.updateFee).run(...feeStructure, id);
    if (res.changes === 0) return [false, "record didn't update"];

    return [true, null];
  } catch (e) {
    console.error("Sqlite error:", e);
    return [null, e];
  }
}
