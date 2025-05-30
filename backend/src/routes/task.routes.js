const express = require('express')
const router = express.Router()

const dueDateMiddleWare = require('../middlewares/validateDueDate.middleware')

const taskController = require('../controllers/Task.controller')

router.get('/all', taskController.getAllTasks)
router.get('/:id', taskController.getTaskById)
router.post("/", taskController.create)
router.put("/:id", dueDateMiddleWare, taskController.updateTask)
router.delete("/:taskId", taskController.deleteTask)


module.exports = router