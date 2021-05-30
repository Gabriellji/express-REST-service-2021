import { v4 as uuid4 } from 'uuid';

import { IUser, IUserToResponse } from '../../interfaces/interfaces';

/**
 *
 * Represents Task entity
 */
class User {
  /**
   *
   * @param {Object} param0 Object with properties that represent user entity
   */
  id: string;
  name: string;
  login: string;
  password: string;

  constructor({
    id = uuid4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser): IUserToResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
