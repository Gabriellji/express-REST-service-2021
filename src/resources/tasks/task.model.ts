import { v4 as uuid4 } from 'uuid';

/**
 *
 * Represents Task entity
 */
class Task {
  /**
   *
   * @param {Object} param0 Object with properties that represent task entity
   */
  public id: string;
  public title: string;
  public order: number;
  public description: string;
  public userId: string;
  public boardId: string;
  public columnId: string;
  constructor({
    id = uuid4(),
    title = 'Title',
    order = 0,
    description = 'description',
    userId = '0',
    boardId = '0',
    columnId = '0',
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

export default Task;
