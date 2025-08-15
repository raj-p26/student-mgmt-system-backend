import cors from "cors";
import express from "express";
import * as routes from "./routes.js";
import { upload } from "./utils/validation-utils.js";
import * as db from "./db.js";
import multer from "multer";
import * as fileRoutes from "./files.routes.js";
import { HOST } from "./utils/config.js";
import { feeStructureRouter } from "./fee.routes.js";

const storage = multer.memoryStorage();
const csvUploadMW = multer({ storage });

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use((_, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    `default-src: 'self'; img-src: 'self' ${HOST};`
  );
  next();
});

app.use("/fee-structure", feeStructureRouter);

app.get("/", function (_, res) {
  res.send({ checkHealth: "done" });
});

app.get("/all", function (_, res) {
  const data = db.allStudents();

  res.send({ data });
});

app.get("/students/:type", routes.getStudents);
app.post("/students/", routes.addStudent);

app.get("/students/id/:id", routes.studentByID);

app.get("/students/:id/has/:doc_type", routes.hasDocument);

app.get("/students/:id/docs", routes.getDocByID);
// app.delete("/students/:id", routes.deleteStudent);
app.delete("/students/bulk-delete", routes.deleteStudents);
app.patch("/students/bulk-update-semester", routes.bulkUpdateStudentSemester);

app.get("/last-serial/:doc_type", routes.getLastSerial);
app.post("/last-serial/", routes.incSerial);

app.post("/:id/edit", upload.any(), routes.updateStudent);

app.post("/admin-creds", upload.any(), routes.adminCredentials);

app.post("/upload-csv", csvUploadMW.any(), routes.uploadCSV);

/// experimental
app.post("/upload-doc", upload.any(), fileRoutes.uploadDoc);

export default app;
