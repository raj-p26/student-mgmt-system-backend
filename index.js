const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const validationUtil = require("./utils/validation-utils");
const db = require("./db");

const app = express();
app.use(cors());
app.use("/files", express.static("uploads"));

app.get("/", function (_, res) {
  res.send({ checkHealth: "done" });
});

app.get("/students/", routes.getStudents);
app.post("/students/", validationUtil.validateInsertStudent, routes.addStudent);

app.get("/students/:id", routes.studentByID);

app.get("/last-gr", (_, res) => {
  db.getLastGRFromDB()
    .then((val) => res.send({ status: "success", gr_no: val }))
    .catch((err) => res.status(500).send({ status: "failed", err }));
});

app.get("/last-tc-serial", (_, res) => {
  db.getLastTCSerial()
    .then((value) => res.send({ status: "success", tc_serial: value }))
    .catch((err) => res.status(500).send({ status: "failed", err }));
});

module.exports = app;
