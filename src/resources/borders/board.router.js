const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  // map board fields to exclude secret fields like "password"
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getBoard(id);
    if (!board) {
      return res.status(404);
    }
   return res.status(200).json(board);
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardsService.createBoard(
    new Board({
      title,
      columns
    })
  );
  res.status(201).json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const updatedBoard = req.body;
  const board = await boardsService.updateBoard(id, updatedBoard);
  if (!board) {
    return res.status(404);
  }
  return res.status(200).json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await boardsService.deleteBoard(id);
  res.status(200).send('Board has been successful deleted');
});

module.exports = router;
