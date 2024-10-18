const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { validateInsertStudent, upload } = require("./utils/validation-utils");
const fileRoutes = require("./files.routes");
const db = require("./db");

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", function (_, res) {
  res.send({ checkHealth: "done" });
});

/*
SELECT bd.doc_name as bonafide, tc.doc_name as tcd, ft.doc_name as ftd, noc.doc_name as nocd
FROM student_records s
JOIN bonafide_doc bd ON s.id = bd.student_id
JOIN tc_doc tc ON s.id = tc.student_id
JOIN first_trial_doc ft ON s.id = ft.student_id
JOIN no_objection_doc noc ON s.id = noc.student_id;
 */

app.get("/students/:type", routes.getStudents);
app.post("/students/", validateInsertStudent, routes.addStudent);

app.get("/students/id/:id", routes.studentByID);

app.get("/students/:id/has/:doc_type", routes.hasDocument);

app.get("/students/:id/docs", routes.getDocByID);

app.get("/last-gr", (_, res) => {
  db.getLastGRFromDB()
    .then((val) => res.send({ status: "success", gr_no: val }))
    .catch((err) => res.status(500).send({ status: "failed", err }));
});

app.get("/last-serial/:doc_type", routes.getLastSerial);
app.post("/last-serial/", routes.incSerial);

app.post("/upload-doc", upload.single("doc"), fileRoutes.uploadDoc);

app.get("/:id/get-img", fileRoutes.getImage);

app.post("/:id/edit", upload.any(), routes.updateStudent);

app.post("/admin-creds", upload.any(), routes.adminCredentials);

module.exports = app;
