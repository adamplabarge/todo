import { createAction as createActionRedux } from '@reduxjs/toolkit'
import { useSelector as reactReduxUseSelector } from 'react-redux'
import { curry } from 'ramda'

/** Actions */
export const createAction = curry((type, args) => createActionRedux(type, () => ({
  payload: {
    ...args
  }
})))

export const createTypeAction = (type) => createAction(type, {})

/** Selectors */
export const useSelector = (selector, props) => reactReduxUseSelector(state => selector(state, props))

/** Types */
export const isNull = value => value === null