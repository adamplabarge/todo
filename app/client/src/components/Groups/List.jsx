import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import * as state from './state'
import { prop, isEmpty, curry } from 'ramda'
import { selectHasList as selectHasUsers } from 'components/Users/state'

import { Link } from 'react-router-dom'
import { Footer } from 'components/Layout'

const groupDisplayName = item => isEmpty(prop('name', item)) ? prop('id', item) : prop('name', item)

const List = ({
  layout
}) => {

  const {
    selectLoading,
    selectList,
  } = state

  const hasUsers = useSelector(selectHasUsers)
  const loading = useSelector(selectLoading)
  const list = useSelector(selectList)
  const dispatch = useDispatch()

  const handleRemove = curry((id, e) => {
    e.preventDefault()
    dispatch(state.remove({ id }))
  })

  const handleCreate = () => {
    dispatch(state.create())
  }

  const canAdd = hasUsers

  return (
    <>
      {
        loading && <div>We are loading something...</div>
      }
      {
        <>
          <Groups>
            <ColItems layout={layout}>
              {
                list && list
                  .filter(item => !isEmpty(prop('name', item)))
                  .map(item =>
                  <Link key={prop('id', item)} to={`$/groups/editor/${prop('id', item)}`}>
                    <ColItem>
                      <div>{groupDisplayName(item)}</div>
                      {/* <Remove onClick={handleRemove(prop('id', item))}><span>X</span></Remove> */}
                    </ColItem>
                  </Link>
                )
              }
            </ColItems>
          </Groups>
            <Footer>
            <AddGroupBtn
              disabled={!canAdd}
              onClick={handleCreate}
            >
              Add Group
            </AddGroupBtn>
          </Footer>
        </>
      }
    </>
  )
}

export default List

const AddGroupBtn = styled.button`
  && {
    background-image: linear-gradient(to right, #12D8FA 0%, rgba(31, 162, 255, .8)  51%, #12D8FA  100%);
  }
`

const Groups = styled.div`
  padding: 0 1em;
  background-color: #000;
`

const ColItems = styled.div`
`

const ColItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid #27292b;
  -webkit-box-shadow: 0px 3px 8px -3px #27292B; 
  box-shadow: 0px 3px 8px -3px #27292B;
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