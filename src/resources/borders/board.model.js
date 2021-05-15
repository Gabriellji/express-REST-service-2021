const { v4: uuid4 } = require('uuid');

class Board {
  constructor({
    id = uuid4(),
    title = 'Title',
    columns = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;