const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/uploadFile");
const { uploadFile } = require("../services/googleDrive.service");

router.route("/test").post(upload.single("image"), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const fileId = await uploadFile(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );
    res.status(200).send(`File uploaded successfully. File ID: ${fileId}`);
  } catch (error) {
    res.status(500).send("Error uploading file.");
  }
});

module.exports = router;
