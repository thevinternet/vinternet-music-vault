const express = require("express");
const router = express.Router();
const multer = require("multer");

const ArtistController = require("../controllers/artist.controller");

//===============================================================================================================//
// Upload Artist Picture File (Multer Middleware)
//===============================================================================================================//

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "../client/public/assets/images/artists")
	},
	filename: function(req, file, cb) {
		let ext = file.originalname.substring(
			file.originalname.lastIndexOf("."),
			file.originalname.length
		);
	cb(null, Date.now() + ext);
	}
});

const upload = multer({ storage: storage });

//===============================================================================================================//
// Routes - All Artist [GET] Routes
//===============================================================================================================//

// [GET] All Artists Endpoint
router.get("/", ArtistController.getAllArtists);

// [GET] Single Artist By Id Endpoint
router.get("/:id", ArtistController.validate("checkArtistId"), ArtistController.getArtistById);

//===============================================================================================================//
// Routes - All Artist [POST] Routes
//===============================================================================================================//

// [POST] Add New Artist With Text Properties & Image File Endpoint
router.post(
	"/new/file",
	upload.single("image"),
	function (req, res, next) {
		req.body = JSON.parse(req.body.artist);
		next();
	},
	ArtistController.validate("checkArtistInput"),
	ArtistController.createNewArtist
);

// [POST] Add New Artist With Text Properties Only Endpoint
router.post("/new/text", ArtistController.validate("checkArtistInput"), ArtistController.createNewArtist);

//===============================================================================================================//
// Routes - All Artist [PUT] Routes
//===============================================================================================================//

// [PUT] Update Artist Text Properties & Image File Enpoint
router.put(
	"/:id/update/file",
	upload.single("image"),
	function (req, res, next) {
		req.body = JSON.parse(req.body.artist);
		next();
	},
	ArtistController.validate("checkArtistInput"),
	ArtistController.updateExistingArtistById
);

// [PUT] Update Artist Text Properties Only Endpoint
router.put("/:id/update/text", ArtistController.validate("checkArtistInput"), ArtistController.updateExistingArtistById);

//===============================================================================================================//
// Routes - All Artist [DELETE] Routes
//===============================================================================================================//

// [DELETE] Artist By Id
router.delete("/:id", ArtistController.validate("checkArtistId"), ArtistController.removeArtistById);

//===============================================================================================================//

module.exports = router;
