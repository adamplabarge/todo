import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import * as state from './state'
import { prop, isEmpty, propEq, compose, last, split } from 'ramda'
import { capitalizeFirstLetter } from 'utils/utils'
import { Link } from 'react-router-dom'
import { GROUPS } from 'utils/constants'
import { selectHasList as selectHasUsers } from 'components/Users/state'
import { withRouter } from "react-router";

const groupDisplayName = item => isEmpty(prop('name', item)) ? prop('id', item) : prop('name', item)

const Row = ({
  location
}) => {

  const entityName = GROUPS

  const dispatch = useDispatch()
  
  const {
    selectLoading,
    selectList,
  } = state

  const loading = useSelector(selectLoading)
  const list = useSelector(selectList)
  const hasUsers = useSelector(selectHasUsers)
  const selectedId = compose(
    parseInt,
    last,
    split(''),
    prop('pathname')
  )(location)
  
  const handleCreate = () => {
    dispatch(state.create())
  }

  const canAdd = hasUsers

  return (
    <Groups>
      {
        loading && <div>We are loading something...</div>
      }
      {
        <>
          <RowItems>
            {
              list && list
                .filter(item => !isEmpty(prop('name', item)))
                .map(item =>
                <Link key={prop('id', item)} to={`/todos/${prop('id', item)}`}>
                  <RowItem>
                    <GroupName
                      selected={propEq('id', selectedId, item)}
                    >
                        {groupDisplayName(item)}
                    </GroupName>
                  </RowItem>
                </Link>
              )
            }
          </RowItems>
          <Actions>
            <AllGroupsLink to="/todos">
              <span style={{marginRight: '1em'}}>All Todos</span>
            </AllGroupsLink>
            <AllGroupsLink to="/groups">
              <span>All Groups</span>
            </AllGroupsLink>
            <button
              disabled={!canAdd}
              onClick={handleCreate}>
              {`Create ${capitalizeFirstLetter(entityName)}`}
            </button>
          </Actions>
        </>
      }
    </Groups>
  )
}


export default withRouter(Row)

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

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`

const AllGroupsLink = styled(Link)`
  padding: .5em;
`

const RowItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const RowItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`

const unSelected = `background-image: linear-gradient(to right, rgba(31, 162, 255, .8) 0%, #12D8FA  51%, rgba(31, 162, 255, .5)  100%);`
const selected = `background-image: linear-gradient(to right, #1D976C 0%, #93F9B9  51%, #1D976C  100%);`
const GroupName = styled.div(props => `
  cursor: pointer;
  ${prop('selected', props) ? selected : unSelected}

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