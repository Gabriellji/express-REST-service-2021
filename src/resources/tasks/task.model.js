const { v4: uuid4 } = require('uuid');

/**
 * 
 * Represents Task entity
 */
class Task {
  /**
   * 
   * @param {Object} param0 Object with properties that represent task entity
   */
  constructor({
    id = uuid4(),
    title = 'Title',
    order = 0,
    description = 'description',
    userId = '0',
    boardId ='0',
    columnId = '0'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;