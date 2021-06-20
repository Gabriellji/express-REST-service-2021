import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  // removeTask,
} from './task.service';
import { HttpCodes, StatusMsg } from '../../enums/enums';
import { getRepository } from 'typeorm';
import { Task } from '../../entities/task.entity';

const { SERVER_ERROR, NOT_FOUND, OK, CREATED, NO_CONTENT } = HttpCodes;
const { SERVER_ERROR_MSG, NOT_FOUND_MSG, NO_CONTENT_MSG } = StatusMsg;

const router = express.Router();

router.get('/:boardId/tasks', async (_, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.get('/:boardId/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    const task = await getTaskById(taskId);
    if (!task) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    return res.status(OK).json(task);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.post('/:boardId/tasks', async (req, res) => {
  try {
    const { boardId } = req.params;
    const task = await createTask({ ...req.body, boardId });
    console.log(task);
    res.status(CREATED).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.put('/:boardId/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    const updatedTask = req.body;
    const task = await updateTask(taskId, updatedTask);
    res.status(OK).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.delete('/:boardId/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    console.log(taskId);
    await getRepository(Task).delete(taskId);
    return res.status(NO_CONTENT).send(NO_CONTENT_MSG);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

export default router;
