import { createAction as createActionRedux } from '@reduxjs/toolkit'
import { useSelector as reactReduxUseSelector } from 'react-redux'
import { curry, head, compose, split } from 'ramda'

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

/** Strings */
export const capitalizeFirstLetter = name => name.charAt(0).toUpperCase() + name.slice(1)
export const getFirstLetter = (string ='') => compose(
  head,
  split(''),
)(string)

/** others */
export const entityFromPath = path => head(path.split('/').slice(1))

/** styles */
export const stylesIf = (condition, styles) => (condition ? styles : '')