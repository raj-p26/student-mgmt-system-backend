import express from "express";
import cors from "cors";
import * as routes from "./routes.js";
import { validateInsertStudent } from "./validation-utils.js";

const app = express();
app.use(cors());
const host = process.env.HOST || "localhost";
/** @type {number} */
const port = Number(process.env.PORT) || 8000;

app.get("/", function (_, res) {
  res.send({ checkHealth: "done" });
});

app.get("/students/", routes.getStudents);
app.post("/students/", validateInsertStudent, routes.addStudent);

app.listen(port, host, () => console.log(`App listening on ${host}:${port}`));
