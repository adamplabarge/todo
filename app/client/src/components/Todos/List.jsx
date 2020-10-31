import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import * as state from './state'
import { inc, prop, curry, propEq, isEmpty } from 'ramda'
import { Link, useParams } from 'react-router-dom'
import { selectHasList as selectHasUsers } from 'components/Users/state'
import { selectHasList as selectHasGroups } from 'components/Groups/state'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Footer } from 'components/Layout'

const List = () => {

  const { id } = useParams() 

  const {
    selectLoading,
    selectListForUser,
  } = state

  const loading = useSelector(selectLoading)
  const list = useSelector(selectListForUser)
  const hasUsers = useSelector(selectHasUsers)
  const hasGroups = useSelector(selectHasGroups)
  const dispatch = useDispatch()

  const handleCreate = () => {
    dispatch(state.create())
  }

  const handleRemove = curry((id, e) => {
    e.preventDefault()
    const item = list.find(propEq('id', id))
    dispatch(state.update({
      ...item,
      complete: true
    }))
  })

  const items = id
    ? list.filter(propEq('group', parseInt(id)))
    : list

  const canAdd = hasUsers && hasGroups

  return (
    <>
      {
        loading && <div>We are loading something...</div>
      }
      <Todos>
        {
          items && items.map((item, index) =>
            <Link key={prop('id', item)} to={`/todos/editor/${prop('id', item)}`}>
              <Todo>
                {inc(index)}. {prop('title', item)} : (Priority {prop('priority', item)})
                <Remove onClick={handleRemove(prop('id', item))}>
                  <FontAwesomeIcon icon={faCheck} />
                </Remove>
              </Todo>
            </Link>
          )
        }
        {
          isEmpty(items) && <h4>No Todo items found...</h4>
        }
      </Todos>
      <Footer>
        <button
          disabled={!canAdd}
          onClick={handleCreate}>
          {`Create Todo`}
        </button>
      </Footer>
    </>
  )
}

export default List

const Todos = styled.div`
  background-color: #000000;
  padding: 1em 0em;
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
  background: linear-gradient(to top left, #000000 0%, #2b2a2a 100%);
`

const Remove = styled.div`
  display: inline-block;
  background-color: #000;
  border-radius: 50%;
  border: solid white 0.1em;
  min-width: 1.5em;
  min-height: 1.5em;
  width: 1.5em;
  height: 1.5em;
  max-width: 1.5em;
  max-height: 1.5em;
  cursor: pointer;

  svg {
    position: relative;
    left: 0.15em;
    bottom: 0..75em;
  }

  &:hover {
    background-color: #5cb052;
  }
`