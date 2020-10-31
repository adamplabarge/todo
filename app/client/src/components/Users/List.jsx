import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import * as state from './state'
import { prop } from 'ramda'
import { entityFromPath, capitalizeFirstLetter, getFirstLetter } from 'utils/utils'
import { Link, useRouteMatch } from 'react-router-dom'

import { Footer } from 'components/Layout'
import { Icon } from 'components/Icon'

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
                  <Icon color={prop('icon', item)}>{getFirstLetter(prop('name', item))}</Icon>
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
        <StyledButton onClick={handleCreate}>
          {`Create ${capitalizeFirstLetter(entityName)}`}
        </StyledButton>
      </Footer>
    </>
  )
}

export default List

const Users = styled.div`
  padding: 0 1em;
  background-color: #000;
`

const StyledButton = styled.button`
 && {
   background-image: linear-gradient(to right, #4CB8C4 0%, #3CD3AD  51%, #4CB8C4  100%);
 }
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