const { v4: uuid4 } = require('uuid');

class Task {
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

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;