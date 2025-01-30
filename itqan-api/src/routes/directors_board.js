const { Router } = require("express");
const router = Router();
const {
    getDirectors_board,
    addDirectors_board,
    updateDirectors_board,
    deleteDirectorsBoardMember
} = require('../controller/directors_board')
const upload = require("../controller/multer");


router.route('/all/:association_id').get(getDirectors_board)
router.route('/add').post(upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'attachments', maxCount: 5 }, // Adjust maxCount as needed
]), addDirectors_board)
router.route('/:id').patch(upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'attachments', maxCount: 5 }, // Adjust maxCount as needed
]), updateDirectors_board)
router.route('/:id').delete(deleteDirectorsBoardMember)


module.exports = router