export class CloseModalModel {
  /** @type {boolean} */
  toggle;

  /**
   * @param {CloseModalModel|null} data
   * @constructor
   */
  constructor(data = null) {
    this.toggle = data?.toggle;
  }
}

CloseModalModel.TOGGLE = 'toggle';

export default class ModalModel {
  /** @type {boolean} */
  toggle;
  /** @type {string|boolean} */
  code;
  /** @type {string|boolean} */
  title;

  /**
   * @param {ModalModel|null} data
   * @constructor
   */
  constructor(data = null) {
    this.toggle = data?.toggle;
    this.code = data?.code;
    this.title = data?.title;
  }
}

ModalModel.TOGGLE = 'toggle';
ModalModel.CODE = 'code';
ModalModel.TITLE = 'title';
