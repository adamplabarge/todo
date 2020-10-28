import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import * as state from './state'
import { length, inc, prop, propOr, isEmpty } from 'ramda'
import { capitalizeFirstLetter } from 'utils/utils'
import { Link, useRouteMatch } from 'react-router-dom'
import { GROUPS } from 'utils/constants'

const groupDisplayName = item => isEmpty(prop('name', item)) ? prop('id', item) : prop('name', item)

const List = () => {

  const entityName = GROUPS

  const { path } = useRouteMatch()
  const entityBasePath = path.includes(GROUPS) ? path : `${path}${GROUPS}`

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
    <Groups>
      {
        loading && <div>We are loading something...</div>
      }
      <Items>
        {
          list && list.map(item =>
            <Item key={prop('id', item)}>
              <Link to={`${entityBasePath}/editor/${prop('id', item)}`}>
                {groupDisplayName(item)}
              </Link>
            </Item>
          )
        }
      </Items>
      <Link to={`${entityBasePath}/editor/${nextId}`} onClick={handleCreate}>
        <button>
          {`Create ${capitalizeFirstLetter(entityName)}`}
        </button>
      </Link>
    </Groups>
  )
}

export default List

const Groups = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1em;
  border-bottom: 1px solid #27292b;
  -webkit-box-shadow: 0px 3px 8px -3px #27292B; 
  box-shadow: 0px 3px 8px -3px #27292B;
  padding: .5em;
`

const Items = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const Item = styled.div(`
  cursor: pointer;

  background-image: linear-gradient(to right, rgba(31, 162, 255, .8) 0%, #12D8FA  51%, rgba(31, 162, 255, .5)  100%);

  margin: .5em;
  padding: .5em 1em;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  font-weight: bold;            
  border-radius: 1em;
  display: block;
  border: none;

  &:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`)