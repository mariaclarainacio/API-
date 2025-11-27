const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const {
  createTaskSchema,
  updateTaskSchema
} = require('../validators/taskValidators');

router.use(protect);

router.post('/', validate(createTaskSchema), createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.patch('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

module.exports = router;