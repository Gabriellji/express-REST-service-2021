import * as express from 'express';
import { Request, Response } from 'express';
import { HttpCodes, StatusMsg } from '../../enums/enums';
import { getUserByEmail, userLogin } from '../users/user.service';

const { SERVER_ERROR, OK } = HttpCodes;
const { SERVER_ERROR_MSG } = StatusMsg;

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const user = await getUserByEmail(login);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const token = await userLogin(user, password);
    return res.status(OK).json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

export default router;
