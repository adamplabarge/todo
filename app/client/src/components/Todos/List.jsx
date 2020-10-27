import React from 'react'
import { useSelector } from 'react-redux'
import * as state from './state'
import { isNull } from 'utils'

const List = () => {
  const {
    selectLoading,
    selectList,
  } = state

  const loading = useSelector(selectLoading)
  const list = useSelector(selectList)

  return (
    <>
      {
        loading && <div>We are loading Todos...</div>
      }
      The Todo Items
    </>
  )
}

export default List