const multer = require("multer");
const { v4: uuidV4 } = require("uuid");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (!req.uuid) {
      req.uuid = uuidV4();
    }
    const uploadPath = `uploads/${req.uuid}`;
    fs.mkdirSync(uploadPath, { recursive: true });

    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    callback(null, Math.round(Math.random() * 1e9) + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const validateInsertStudent = [
  // body("stream").notEmpty(),
  // body("semester").notEmpty(),
  // body("elective_course").notEmpty(),
  // body("main_course").notEmpty(),
  // body("first_secondary_subject").notEmpty(),
  // body("tertiary_secondary_subject").notEmpty(),
  // body("aadhar_number").notEmpty(),
  // body("full_name").notEmpty(),
  // body("full_name_of_parent").notEmpty(),
  // body("address").notEmpty(),
  // body("contact_no").notEmpty(),
  // body("wh_no").notEmpty(),
  // body("parent_no").notEmpty(),
  // body("email").notEmpty().isEmail().normalizeEmail(),
  // body("gender").notEmpty(),
  // body("birth_date").isDate(),
  // body("birth_place").notEmpty(),
  // body("caste").notEmpty(),
  // body("city").notEmpty(),
  // body("district").notEmpty(),
  // body("pincode").notEmpty(),

  // TODO: handle other file fields in future
  upload.fields([{ name: "studentimg" }]),
];

module.exports = {
  validateInsertStudent,
};
