import express from 'express';
import Board from './board.model';
import {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
} from './board.service';
import { deleteTasksByBoardId } from '../tasks/task.service';
import { HttpCodes } from '../../interfaces/enums';

const { SERVER_ERROR, NOT_FOUND, OK, CREATED } = HttpCodes;

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const boards = await getAll();
    return res.status(OK).json(boards);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('ID param is required');
    }
    const board = await getBoardById(id);
    if (!board) {
      return res.status(NOT_FOUND).send('Not Found');
    }
    return res.status(OK).json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send('Server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const board = new Board(req.body);
    await createBoard(board);
    res.status(CREATED).json(board);
  } catch (err) {
    console.error(err.message);
    res.status(SERVER_ERROR).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('ID param is required');
    }
    const board = getBoardById(id);
    if (!board) {
      return res.status(NOT_FOUND);
    }
    await updateBoard(id, req.body);
    return res.status(OK).json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('ID param is required');
    }
    const board = getBoardById(id);
    if (!board) {
      return res.status(NOT_FOUND);
    }
    await deleteBoard(id);
    await deleteTasksByBoardId(id);
    return res.status(OK).json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send('Server error');
  }
});

export default router;
