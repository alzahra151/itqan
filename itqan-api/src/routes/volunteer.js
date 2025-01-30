const { Router } = require("express");
const router = Router();
const {
    getVolunteers,
    addVolunteer,
    updateVolunteer,
    deleteVolunteer
} = require('../controller/volunteer')
const upload = require("../controller/multer");


router.route('/all/:association_id').get(getVolunteers)
router.route('/add').post(upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'attachments', maxCount: 5 }, // Adjust maxCount as needed
]), addVolunteer)
router.route('/:id').patch(upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'attachments', maxCount: 5 }, // Adjust maxCount as needed
]), updateVolunteer)
router.route('/:id').delete(deleteVolunteer)

module.exports = router