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
            <Item key={prop('id', item)} color={prop('color', item)}>
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
  padding: 1em;
`

const Items = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
`

const Item = styled.div(props => `
  background-color: #2d3436;
  background: linear-gradient(315deg, ${propOr('#000', 'color', props)} 0%, #000 75%);
  display: inline-block;
  border: 0.1em solid #fff;
  border-radius: 3em;
  padding: .5em 1em;
  margin-right: 0.5em;
`)