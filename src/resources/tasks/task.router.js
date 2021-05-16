const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  // map task fields to exclude secret fields like "password"
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
    const { id } = req.params;
    const task = await tasksService.getTask(id);
    if (!task) {
      return res.status(404);
    }
   return res.status(200).json(task);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const {boardId} = req.params;
  const task = await tasksService.createTask(
    new Task({
      ...req.body,
      boardId
    })
  );
  return res.status(201).json(task);
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  const task = await tasksService.updateTask(id, updatedTask);
  if (!task) {
    return res.status(404);
  }
  return res.status(200).json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const { id } = req.params;
  await tasksService.deleteTask(id);
  res.status(204).json();
});

module.exports = router;
