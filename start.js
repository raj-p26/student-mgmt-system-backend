const app = require("./index");
const config = require("./utils/config");

const server = app.listen(config.PORT, config.HOST, () => {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});

module.exports = server;
