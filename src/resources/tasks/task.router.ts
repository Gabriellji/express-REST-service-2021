import express from 'express';
import Task from './task.model';
import {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from './task.service';

const router = express.Router();

router.get('/:boardId/tasks', async (_, res) => {
  try {
    const tasks = await getAll();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:boardId/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      throw new Error('ID is required');
    }
    const task = await getTask(taskId);
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
    await createTask(task);
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:boardId/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      throw new Error('ID is required');
    }
    const updatedTask = req.body;
    const task = await updateTask(taskId, updatedTask);
    res.status(200).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:boardId/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      throw new Error('ID is required');
    }
    const task = await getTask(taskId);
    if (!task) {
      return res.status(404).send('Not Found');
    }
    await deleteTask(taskId);
    return res.status(200).json(task);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

export default router;
