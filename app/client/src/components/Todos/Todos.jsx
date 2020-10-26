import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectTodos,
  getTodos,
  selectGetting
} from './todosSlice'
import { isEmpty } from 'ramda'

const Todos = () => {
  const todos = useSelector(selectTodos)
  const getting = useSelector(selectGetting)
  const dispatch = useDispatch()

  if (todos === null && !getting) {
    dispatch(getTodos())
  }

  return (
    <>
      {
        getting && <span>Fetching items.</span>
      }
    </>
  )
}

export default Todos