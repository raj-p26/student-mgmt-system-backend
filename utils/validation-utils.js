const multer = require("multer");
const { v4: uuidV4 } = require("uuid");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, _, callback) => {
    if (!req.headers.uuid) {
      req.headers.uuid = uuidV4();
    }
    const uploadPath = `uploads/${req.headers.uuid}`;
    fs.mkdirSync(uploadPath, { recursive: true });

    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const validateInsertStudent = [upload.fields([{ name: "studentimg" }])];

module.exports = {
  validateInsertStudent,
  upload,
};
