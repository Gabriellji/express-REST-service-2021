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

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const boards = await getAll();
    return res.status(200).json(boards);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
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
      return res.status(404).send('Not Found');
    }
    return res.status(200).json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const board = new Board(req.body);
    await createBoard(board);
    res.status(201).json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
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
      return res.status(404);
    }
    await updateBoard(id, req.body);
    return res.status(200).json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
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
      return res.status(404);
    }
    await deleteBoard(id);
    await deleteTasksByBoardId(id);
    return res.status(200).json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

export default router;
