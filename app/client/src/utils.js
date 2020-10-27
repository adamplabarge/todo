import { createAction as createActionRedux } from '@reduxjs/toolkit'
import { curry } from 'ramda'

/** Actions */
export const createAction = curry((type, args) => createActionRedux(type, () => ({
  payload: {
    ...args
  }
})))

export const createTypeAction = (type) => createAction(type, {})

/** Types */
export const isNull = value => value === null