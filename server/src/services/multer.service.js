const multer = require("multer");

//===============================================================================================================//

const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, Date.now() + ext);
  }
});

//===============================================================================================================//

module.exports = storage;
