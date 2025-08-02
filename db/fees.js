import Database from "better-sqlite3";
import queries from "../utils/queries.json" with { type: "json" };

import { DB_NAME } from "../utils/config.js";

if (!DB_NAME) throw new Error("DB_NAME not set in .env");

const db = new Database(DB_NAME);

export function addFee(feeData) {
  const values = Object.values(feeData);

  try {
    const result = db.prepare(queries.addFee).run(values);
    return [result, null];
  } catch(e) {
    return [null, e];
  }
}

export function getAllFeeStructures() {
  return db.prepare(queries.allFees).all();
}
