import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as state from './state'
import { length, inc, prop } from 'ramda'
import { entityFromPath, capitalizeFirstLetter } from 'utils/utils'
import { Link, useRouteMatch } from 'react-router-dom'

const List = () => {

  const { path } = useRouteMatch()
  const entityName = entityFromPath(path)

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
        list && list.map(item =>
          <div key={prop('id', item)}>
            <Link to={`${path}/editor/${prop('id', item)}`}>
              {prop('name', item)} : {prop('id', item)}
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