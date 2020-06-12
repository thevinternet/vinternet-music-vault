const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./client/src/assets/images/releases");
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

const ReleaseController = require("../controllers/release.controller");

//===============================================================================================================//

// GET All Releases Endpoint
router.get("/", ReleaseController.getAllReleases);

// GET Single Release By Id Endpoint
router.get("/:id", ReleaseController.getReleaseById);

// GET All Releases By Label Id Endpoint
router.get("/label/:id", ReleaseController.getReleasesByLabel);

// GET All Releases By Artist Id Endpoint
router.get("/artist/:id", ReleaseController.getReleasesByArtist);

//===============================================================================================================//

// PUT Update Release Text Properties & Image File Endpoint
router.put("/:id/update/file", upload.single("image"), ReleaseController.updateReleasePropertiesFile);
  
// PUT Update Release Text Properties Only Endpoint
router.put("/:id/update/text", ReleaseController.updateReleasePropertiesText);
  
//===============================================================================================================//

// DELETE Label By Id
router.delete("/:id", ReleaseController.removeReleaseById);

//===============================================================================================================//

module.exports = router;
