const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./client/src/assets/images/labels");
  },
  filename: function(req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, Date.now() + ext);
  }
});

const upload = multer({
  storage: storage
});

//===============================================================================================================//

const LabelController = require("../controllers/label.controller");

//===============================================================================================================//

// GET All Labels Endpoint
router.get("/", LabelController.getAllLabels);

// GET Single Label By Id Endpoint
router.get("/:id", LabelController.getLabelById);

//===============================================================================================================//

// POST Add New Label With Text Properties & Image File Endpoint
router.post(
  "/new/file",
  upload.single("image"),
  LabelController.createNewLabelFile
);

// POST Add New Label With Text Properties Only Endpoint
router.post("/new/text", LabelController.createNewLabelText);

//===============================================================================================================//

// PUT Update Label Text Properties & Image File Endpoint
router.put(
  "/:id/update/file",
  upload.single("image"),
  LabelController.updateLabelPropertiesFile
);

// PUT Update Label Text Properties Only Endpoint
router.put("/:id/update/text", LabelController.updateLabelPropertiesText);

//===============================================================================================================//

// DELETE Label By Id
router.delete("/:id", LabelController.removeLabelById);

//===============================================================================================================//

module.exports = router;
