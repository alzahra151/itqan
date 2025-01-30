
const { Router } = require("express");
const router = Router();
const { addService, getServices, deleteService, updateService } = require('../controller/service')

router.post('/add', addService)
router.get('/all/:association_id', getServices)
router.patch('/:id', updateService)
router.delete('/:id', deleteService)

module.exports = router