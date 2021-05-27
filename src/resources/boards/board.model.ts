import { v4 as uuid4 } from 'uuid';
/**
 *
 * Represents Board entity
 */
class Board {
  /**
   *
   * @param {Object} param0 Object with properties that represent board entity
   */
  public id: string;
  public title: string;
  public columns: number;
  constructor({ id = uuid4(), title = 'Title', columns = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
