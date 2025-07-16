import cors from "cors";
import express from "express";
import * as routes from "./routes.js";
import { upload } from "./utils/validation-utils.js";
import * as db from "./db.js";
import multer from "multer";

const storage = multer.memoryStorage();
const csvUploadMW = multer({ storage });

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());

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

app.get("/last-serial/:doc_type", routes.getLastSerial);
app.post("/last-serial/", routes.incSerial);

app.post("/:id/edit", upload.any(), routes.updateStudent);

app.post("/admin-creds", upload.any(), routes.adminCredentials);

app.post("/upload-csv", csvUploadMW.any(), routes.uploadCSV);

export default app;
