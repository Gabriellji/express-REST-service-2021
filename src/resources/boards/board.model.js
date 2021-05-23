const { v4: uuid4 } = require('uuid');
/**
 * 
 * Represents Board entity
 */
class Board {
  /**
   * 
   * @param {object} param0 object with properties that represent board entity
   */
  constructor({
    id = uuid4(),
    title = 'Title',
    columns = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;