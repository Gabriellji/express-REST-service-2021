const { v4: uuid4 } = require('uuid');

/**
 * 
 * Represents Task entity
 */
class User {
    /**
   * 
   * @param {Object} param0 Object with properties that represent user entity
   */
  constructor({
    id = uuid4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
