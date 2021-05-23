const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.get('/:boardId/tasks', async (req, res) => {
  try {
    const tasks = await tasksService.getAll();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:boardId/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await tasksService.getTask(taskId);
    if (!task) {
      return res.status(404).send('Not Found');
    }
    return res.status(200).json(task);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

router.post('/:boardId/tasks', async (req, res) => {
  try {
    const { boardId } = req.params;
    const task = new Task({
      ...req.body,
      boardId,
    });
    await tasksService.createTask(task);
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:boardId/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = req.body;
    const task = await tasksService.updateTask(taskId, updatedTask);
    res.status(200).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:boardId/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await tasksService.getTask(taskId);
    if (!task) {
      return res.status(404).send('Not Found');
    }
    await tasksService.deleteTask(taskId);
    return res.status(200).json(task);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
