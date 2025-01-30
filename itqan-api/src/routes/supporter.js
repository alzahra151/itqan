const { Router } = require("express");
const router = Router();
const {
    getSupporters,
    addSupporter,
    updateSupporter,
    deleteSupporter
} = require('../controller/supporter')
const upload = require("../controller/multer");


router.route('/all/:association_id').get(getSupporters)
router.route('/add').post(
    upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'attachments', maxCount: 5 }, // Adjust maxCount as needed
]), addSupporter)
router.route('/:id').patch(upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'attachments', maxCount: 5 }, // Adjust maxCount as needed
]), updateSupporter)
router.route('/:id').delete(deleteSupporter)

module.exports = router