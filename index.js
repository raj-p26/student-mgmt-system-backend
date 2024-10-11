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

app.get("/students/:type", routes.getStudents);
app.post("/students/", validateInsertStudent, routes.addStudent);

app.get("/students/:id", routes.studentByID);

app.get("/students/:id/has/:doc_type", routes.hasDocument);

app.get("/last-gr", (_, res) => {
  db.getLastGRFromDB()
    .then((val) => res.send({ status: "success", gr_no: val }))
    .catch((err) => res.status(500).send({ status: "failed", err }));
});

app.get("/last-serial/:doc_type", routes.getLastSerial);
app.post("/last-serial/", routes.incSerial);

app.post("/upload-doc", upload.single("doc"), fileRoutes.uploadDoc);

app.get("/:id/get-img", fileRoutes.getImage);

// app.post("/upload-tc", upload.single("tc-doc"), fileRoutes.uploadDoc);
// app.post(
//   "/upload-first-trial",
//   upload.single("first-trial-doc"),
//   fileRoutes.uploadDoc,
// );

// app.post("/upload-noc", upload.single("noc-doc"), fileRoutes.uploadDoc);
// app.post("/upload-bc", upload.single("bc-doc"), fileRoutes.uploadDoc);

app.post("/:id/edit", upload.any(), routes.updateStudent);

app.post("/admin-creds", upload.any(), routes.adminCredentials);

module.exports = app;
