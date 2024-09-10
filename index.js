const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const validationUtil = require("./validation-utils");

const app = express();
app.use(cors());
const host = process.env.HOST || "localhost";
/** @type {number} */
const port = Number(process.env.PORT) || 8000;

app.get("/", function (_, res) {
  res.send({ checkHealth: "done" });
});

app.get("/students/", routes.getStudents);
app.post("/students/", validationUtil.validateInsertStudent, routes.addStudent);

app.listen(port, host, () => console.log(`App listening on ${host}:${port}`));
