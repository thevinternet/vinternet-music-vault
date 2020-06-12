const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./client/src/assets/images/artists");
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

const ArtistController = require("../controllers/artist.controller");

//===============================================================================================================//

// [GET] All Artists Endpoint
router.get("/", ArtistController.getAllArtists);

// [GET] Single Artist By Id Endpoint
router.get("/:id", ArtistController.getArtistById);

//===============================================================================================================//

// [POST] Add New Artist With Text Properties & Image File Endpoint
router.post(
  "/new/file",
  upload.single("image"),
  ArtistController.createNewArtistFile
);

// [POST] Add New Artist With Text Properties Only Endpoint
router.post("/new/text", ArtistController.createNewArtistText);

//===============================================================================================================//

// [PUT] Update Artist Text Properties & Image File Enpoint
router.put(
  "/:id/update/file",
  upload.single("image"),
  ArtistController.updateArtistPropertiesFile
);

// [PUT] Update Artist Text Properties Only Endpoint
router.put("/:id/update/text", ArtistController.updateArtistPropertiesText);

//===============================================================================================================//

// [DELETE] Artist By Id
router.delete("/:id", ArtistController.removeArtistById);

//===============================================================================================================//

module.exports = router;
