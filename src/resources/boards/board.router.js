const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const taskService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardService.getAll();
    return res.status(200).json(boards);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const board = await boardService.getBoardById(req.params.id);
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
    await boardService.createBoard(board);
    res.status(201).json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const board = boardService.getBoardById(id);
    if (!board) {
      return res.status(404);
    }
    await boardService.updateBoard(id, req.body);
    return res.status(200).json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const board = boardService.getBoardById(id);
    if (!board) {
      return res.status(404);
    }
    await boardService.deleteBoard(id);
    await taskService.deleteTasksByBoardId(id);
    return res.status(200).json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
