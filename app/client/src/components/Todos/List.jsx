import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as slice from './todosSlice'
import { isNull } from 'utils'

const List = () => {
  const loading = useSelector(slice.selectLoading)
  const todos = useSelector(slice.selectTodos)
  const create = useSelector(slice.selectCreate)
  const dispatch = useDispatch()

  if (isNull(todos) && !loading) {
    dispatch(slice.read())
  }

  const handleCreate = () => {
    dispatch(slice.create())
  }

  return (
    <>
      {
        loading && <div>We are loading something...</div>
      }

    </>
  )
}

export default List