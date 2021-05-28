import express from 'express';
import Task from './task.model';
import {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from './task.service';
import { HttpCodes, StatusMsg, RequiredError } from '../../interfaces/enums';

const { SERVER_ERROR, NOT_FOUND, OK, CREATED } = HttpCodes;
const { SERVER_ERROR_MSG, NOT_FOUND_MSG } = StatusMsg;
const { PARAM_PEQUIRED } = RequiredError;

const router = express.Router();

router.get('/:boardId/tasks', async (_, res) => {
  try {
    const tasks = await getAll();
    res.status(OK).json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.get('/:boardId/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      throw new Error(PARAM_PEQUIRED);
    }
    const task = await getTask(taskId);
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
    const task = new Task({
      ...req.body,
      boardId,
    });
    await createTask(task);
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
      throw new Error(PARAM_PEQUIRED);
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
      throw new Error(PARAM_PEQUIRED);
    }
    const task = await getTask(taskId);
    if (!task) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    await deleteTask(taskId);
    return res.status(OK).json(task);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

export default router;
