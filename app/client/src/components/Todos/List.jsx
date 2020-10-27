import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as state from './state'
import { isNull } from 'utils'

const List = () => {
  const {
    selectLoading,
    selectList,
    read,
  } = state

  const loading = useSelector(selectLoading)
  const list = useSelector(selectList)
  const dispatch = useDispatch()

  if (isNull(list) && !loading) {
    dispatch(read())
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