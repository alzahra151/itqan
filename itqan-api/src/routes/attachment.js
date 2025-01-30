const { addAttachment } = require("../controller/attachment")
const { Router } = require("express");
const router = Router();
const uploader = require("../controller/multer");

router.post('/add/:beneficiaryId', uploader.fields(
    [{ name: 'illness_attachment', maxCount: 5 },
        { name: 'contact_attachment', maxCount: 5 },
      { name: 'certificate_attachment', maxCount: 5 },
    { name: 'image', maxCount: 1 },
    ]), addAttachment)

module.exports = router