const express = require("express");
const router = express.Router();
const multer = require("multer");

const LabelController = require("../controllers/label.controller");

//===============================================================================================================//
// Upload Label Picture File (Multer Middleware)
//===============================================================================================================//

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "../client/public/assets/images/labels")
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
// Routes - All Label [GET] Routes
//===============================================================================================================//

// [GET] All Labels Endpoint
router.get("/", LabelController.getAllLabels);

// [GET] Single Label By Id Endpoint
router.get("/:id", LabelController.validate("checkLabelId"), LabelController.getLabelById);

//===============================================================================================================//
// Routes - All Label [POST] Routes
//===============================================================================================================//

// [POST] Add New Label With Text Properties & Image File Endpoint
router.post(
	"/new/file",
	upload.single("image"),
	function (req, res, next) {
		req.body = JSON.parse(req.body.label);
		next();
	},
	LabelController.validate("checkLabelInput"),
	LabelController.createNewLabel
);

// [POST] Add New Label With Text Properties Only Endpoint
router.post("/new/text", LabelController.validate("checkLabelInput"), LabelController.createNewLabel);

//===============================================================================================================//
// Routes - All Label [PUT] Routes
//===============================================================================================================//

// [PUT] Update Label Text Properties & Image File Enpoint
router.put(
	"/:id/update/file",
	upload.single("image"),
	function (req, res, next) {
		req.body = JSON.parse(req.body.label);
		next();
	},
	LabelController.validate("checkLabelInput"),
	LabelController.updateExistingLabelById
);

// [PUT] Update Label Text Properties Only Endpoint
router.put("/:id/update/text", LabelController.validate("checkLabelInput"), LabelController.updateExistingLabelById);

//===============================================================================================================//
// Routes - All Label [DELETE] Routes
//===============================================================================================================//

// [DELETE] Label By Id
router.delete("/:id", LabelController.validate("checkLabelId"), LabelController.removeLabelById);

//===============================================================================================================//

module.exports = router;
