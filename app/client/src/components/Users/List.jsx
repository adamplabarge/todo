import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as state from './state'
import { isNull } from 'utils'
import { length, inc } from 'ramda'

import { Link, useRouteMatch } from 'react-router-dom'

const List = () => {

  const { path } = useRouteMatch()

  const {
    selectLoading,
    selectList,
  } = state

  const loading = useSelector(selectLoading)
  const list = useSelector(selectList)
  const dispatch = useDispatch()

  const total = length(list)
  // this is not ideal, server should return the id and update history?
  const nextId = total === 0 ? 1 : inc(total)

  const handleCreateUser = () => {
    dispatch(state.create())
  }

  return (
    <>
      {
        loading && <div>We are loading something...</div>
      }
      {
        list && list.map(user =>
          <div key={user.id}>
            <Link to={`${path}/editor/${user.id}`}>
              {user.name} : {user.id}
            </Link>
          </div>
        )
      }
      <Link to={`${path}/editor/${nextId}`} onClick={handleCreateUser}><button>Create User</button></Link>
    </>
  )
}

export default List