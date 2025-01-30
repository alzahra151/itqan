// const cloudinary = require("../controller/cloudinary");
const uploader = require("../controller/multer");

function multiUpload(req, res, next) {
    uploader.array('illness_attachment')(req, res, next)
    uploader.array('contact_attachment')(req, res, next);
    next();
}
module.exports = multiUpload
