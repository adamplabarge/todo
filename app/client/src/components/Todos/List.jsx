import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as state from './state'
import { length, inc, prop } from 'ramda'
import { entityFromPath, capitalizeFirstLetter } from 'utils/utils'
import { Link, useRouteMatch } from 'react-router-dom'

import { TODOS } from 'utils/constants'

const List = () => {

  const { path } = useRouteMatch()
  const entityName = entityFromPath(path) || TODOS

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

  const handleCreate = () => {
    dispatch(state.create())
  }

  return (
    <>
      {
        loading && <div>We are loading something...</div>
      }
      {
        list && list.map((item, index) =>
          <div key={prop('id', item)}>
            <Link to={`${path}/editor/${prop('id', item)}`}>
              {inc(index)}. {prop('title', item)} : (Priority {prop('priority', item)})
            </Link>
          </div>
        )
      }
      <Link to={`${path}/editor/${nextId}`} onClick={handleCreate}>
        <button>
          {`Create ${capitalizeFirstLetter(entityName)}`}
        </button>
      </Link>
    </>
  )
}

export default List