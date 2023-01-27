const adviceController = require('../controllers/adviceController')

const router = require('express').Router()

router.post('/', adviceController.addAdvice)
router.post('/get', adviceController.getAdvice)
router.delete('/:id', adviceController.deleteAdvice)

module.exports = router
