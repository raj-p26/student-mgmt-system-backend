/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */

/**
 * @param {Request} _ request object
 * @param {Response} res response object
 */
function uploadDoc(_, res) {
  res.send({ status: "success", upload_id: "TODO" });
}

module.exports = {
  uploadDoc,
};
