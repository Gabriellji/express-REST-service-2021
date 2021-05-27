import { v4 as uuid4 } from 'uuid';

import { IUser } from 'interfaces/user';

/**
 *
 * Represents Task entity
 */
class User {
  /**
   *
   * @param {Object} param0 Object with properties that represent user entity
   */
  public id: string;
  public name: string;
  public login: string;
  public password: string;

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

  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
