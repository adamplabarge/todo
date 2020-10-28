import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import * as state from './state'
import { length, inc, prop } from 'ramda'
import { entityFromPath, capitalizeFirstLetter } from 'utils/utils'
import { Link, useRouteMatch } from 'react-router-dom'
import { TODOS } from 'utils/constants'

import { Footer } from 'components/Layout'

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
      <Todos>
        {
          list && list.map((item, index) =>
            <Todo key={prop('id', item)}>
              <Link to={`${path}/editor/${prop('id', item)}`}>
                {inc(index)}. {prop('title', item)} : (Priority {prop('priority', item)})
              </Link>
              <Remove><span>X</span></Remove>
            </Todo>
          )
        }
      </Todos>
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

const Todos = styled.div`
  background-color: #000000;
  padding: 1em ;
`

const Todo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: solid #fff 0.1em;
  border-radius: 3em;
  padding: 1em;
  margin: .5em;
  background: linear-gradient(to bottom left, #000000 0%, #2b2a2a 100%);
`

const Remove = styled.div`
  display: inline-block;
  background-color: #000;
  border-radius: 50%;
  border: solid white 0.1em;
  width: 1.5em;
  height: 1.5em;
  cursor: pointer;

  span {
    position: relative;
    left: 0.35em;
    bottom: 0.13em;
  }

  &:hover {
    background-color: #EB3349;
  }
`