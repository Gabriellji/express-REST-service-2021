import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../common/config';
const expirationPeriod = '30d';

const { JWT_SECRET_KEY } = config;

const getJWToken = (id: string): string => {
  if (!JWT_SECRET_KEY) {
    throw new Error('rrrrr');
  }
  return jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: expirationPeriod });
};

const decodeJWToken = (token: string): string | JwtPayload => {
  if (!JWT_SECRET_KEY) {
    throw new Error('rrrrr');
  }
  return jwt.verify(token, JWT_SECRET_KEY);
};

const verifyJWToken = (token: string): boolean => {
  if (!JWT_SECRET_KEY) {
    throw new Error('rrrrr');
  }
  try {
    jwt.verify(token, JWT_SECRET_KEY);
    console.log(jwt.verify(token, JWT_SECRET_KEY));
    return true;
  } catch (error) {
    return false;
  }
};

// const extractIdFromToken = (token: any) =>
//   decodeJWToken(token).then((jwtToken: { id: any }) => jwtToken.id);

export {
  getJWToken,
  decodeJWToken,
  verifyJWToken,
  //   extractIdFromToken,
};
