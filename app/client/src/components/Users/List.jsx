import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import * as state from './state'
import { prop } from 'ramda'
import { entityFromPath, capitalizeFirstLetter, getFirstLetter } from 'utils/utils'
import { Link, useRouteMatch } from 'react-router-dom'

import { Footer } from 'components/Layout'
import { UserIcon } from './UsersMenu'

const List = () => {

  const dispatch = useDispatch()

  const { path } = useRouteMatch()
  const entityName = entityFromPath(path)

  const {
    selectLoading,
    selectList,
  } = state

  const loading = useSelector(selectLoading)
  const list = useSelector(selectList)

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
                <div>
                  <UserIcon color={prop('icon', item)}>{getFirstLetter(prop('name', item))}</UserIcon>
                  <strong style={{marginLeft: '1em'}}>{prop('name', item)}</strong>
                </div>
                <div>
                  <span>ID {prop('id', item)}</span>
                </div>
              </User>
            </Link>
          )
        }
      </Users>
      <Footer>
        <button onClick={handleCreate}>
          {`Create ${capitalizeFirstLetter(entityName)}`}
        </button>
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
  padding: 1em 1em 1em 0;
  border-bottom: 1px solid #27292b;
  -webkit-box-shadow: 0px 3px 8px -3px #27292B; 
  box-shadow: 0px 3px 8px -3px #27292B;
`