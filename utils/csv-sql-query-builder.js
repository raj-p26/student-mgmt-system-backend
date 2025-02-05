import csv from "csv-parser";
import fs from "node:fs";
import * as db from "../db.js";

const results = [];

function extraction() {
  fs.createReadStream("sample.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("finish", () => {
      db.insertUsingCSVData(results);
    });
}

extraction();
