// import express from 'express';
// import Board from './board.model';
// import {
//   getAll,
//   getBoardById,
//   createBoard,
//   updateBoard,
//   deleteBoard,
// } from './board.service';
// import { deleteTasksByBoardId } from '../tasks/task.service';
import * as express from 'express';
import { Request, Response } from 'express';
import { HttpCodes, StatusMsg } from '../../enums/enums';
import { getRepository } from 'typeorm';
import { Board } from '../../entities/board.entity';

const { SERVER_ERROR, NOT_FOUND, OK, CREATED, NO_CONTENT } = HttpCodes;

const { SERVER_ERROR_MSG, NOT_FOUND_MSG, NO_CONTENT_MSG } = StatusMsg;

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const boards = await getRepository(Board).find();

    return res.json(boards);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send('Server error');
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    // const { id } = req.params;
    console.log(req.params.id);
    if (!req.params.id) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    const board = await getRepository(Board).findOne(req.params.id);
    if (!board) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    return res.status(OK).json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, columns } = req.body;
    const newBoard: Board = getRepository(Board).create({
      title,
      columns,
    });
    const results = await getRepository(Board).save(newBoard);
    res.status(CREATED).json(results);
  } catch (err) {
    console.error(err.message);
    res.status(SERVER_ERROR).send('Server error');
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    // const { id } = req.params;
    // if (!id) {
    //   throw new Error('ID param is required');
    // }

    // const board = await updateBoard(id, req.body);
    // if (!board) {
    //   return res.status(NOT_FOUND).send('NOT_FOUND_MSG');
    // }

    // const { id } = req.params;
    if (!req.params.id) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    const updatedBoard = req.body;

    const boardToUpdate = await getRepository(Board).findOne(req.params.id);

    if (!boardToUpdate) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }

    getRepository(Board).merge(boardToUpdate, updatedBoard);

    const boardToSave = await getRepository(Board).save(boardToUpdate);

    return res.status(OK).json(boardToSave);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send('Server error');
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    await getRepository(Board).delete(id);
    return res.status(NO_CONTENT).send(NO_CONTENT_MSG);
    // const board = getBoardById(id);
    // if (!board) {
    //   return res.status(NOT_FOUND);
    // }
    // await deleteBoard(id);
    // await deleteTasksByBoardId(id);
    // return res.status(OK).json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send('Server error');
  }
});

export default router;
