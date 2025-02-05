// const app = require("./index");
// const config = require("./utils/config");

import app from "./index.js";
import {HOST, PORT} from "./utils/config.js";

export const server = app.listen(PORT, HOST, () => {
  console.log(`App listening on http://${HOST}:${PORT}`);
});

