import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import * as state from './state'
import { length, inc, prop } from 'ramda'
import { entityFromPath, capitalizeFirstLetter } from 'utils/utils'
import { Link, useRouteMatch } from 'react-router-dom'

import { Footer } from 'components/Layout'

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
      <Users>
        {
          list && list.map(item =>
            <Link key={prop('id', item)} to={`${path}/editor/${prop('id', item)}`}>
              <User>
                <strong>{prop('name', item)}</strong><span>ID {prop('id', item)}</span>
              </User>
            </Link>
          )
        }
      </Users>
      <Footer>
        <Link to={`${path}/editor/${nextId}`} onClick={handleCreate}>
          <button>
            {`Create ${capitalizeFirstLetter(entityName)}`}
          </button>
        </Link>
      </Footer>
    </>
  )
}

export default List

const Users = styled.div`
  padding: 1em;
`

const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid #27292b;
  -webkit-box-shadow: 0px 3px 8px -3px #27292B; 
  box-shadow: 0px 3px 8px -3px #27292B;
`