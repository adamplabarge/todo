/** Actions */
class Action {
  constructor(type, props) {
    this.type = type
    this.payload = {
      ...props
    }
  }

  static toString() {
    return this.type
  }
}

export const createAction = (type, props) => new Action(type, props)

/** Types */
export const isNull = value => value === null