import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as state from './state'
import { isNull } from 'utils'

import { Link, useRouteMatch } from 'react-router-dom'

const List = () => {

  const { path } = useRouteMatch()

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

  const handleCreateUser = () => {
    dispatch(state.create())
  }


  return (
    <>
      {
        loading && <div>We are loading something...</div>
      }
      <Link to={`${path}/editor`} onClick={handleCreateUser}><button>Create User</button></Link>
    </>
  )
}

export default List