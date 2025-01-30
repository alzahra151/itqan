const multer = require('multer')
const ApiError = require('../helpers/apiError')

module.exports = multer({
    storage: multer.diskStorage({}),
});

