// const multer = require("multer");
// const { v4: uuidV4 } = require("uuid");
// const fs = require("fs");
import multer from "multer";
import { v4 } from "uuid";
import fs from "node:fs";

const storage = multer.diskStorage({
  destination: (req, _, callback) => {
    /// Experimental
    if (req.headers.old_file) {
      fs.rmSync(`uploads/${req.headers.old_file}`);
    }

    if (!req.headers.uuid) {
      req.headers.uuid = v4();
    }

    const uploadPath = `uploads/${req.headers.uuid}`;
    fs.mkdirSync(uploadPath, { recursive: true });

    callback(null, uploadPath);
  },
  filename: (_req, file, callback) => {
    callback(null, file.originalname);
  },
});

export const upload = multer({ storage });

export const validateInsertStudent = [upload.fields([{ name: "studentimg" }])];

