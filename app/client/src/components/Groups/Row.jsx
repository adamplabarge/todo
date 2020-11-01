import React, { useMemo, useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import * as state from './state'
import { prop, isEmpty, propEq, compose, last, split, test, pathOr } from 'ramda'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";

import ScrollContainer from 'react-indiana-drag-scroll'

const groupDisplayName = item => isEmpty(prop('name', item)) ? prop('id', item) : prop('name', item)
const getIdFromPath = compose(
  parseInt,
  last,
  split(''),
  prop('pathname')
)
const isTodosRoute = compose(
  test(/^todos/),
  prop('pathname')
)

const Row = ({
  location
}) => {

  const dispatch = useDispatch()
  
  const {
    selectLoading,
    selectList,
  } = state

  const scrollWrapperEl = useRef(null)

  const loading = useSelector(selectLoading)
  const list = useSelector(selectList)
  const selectedId = useMemo(() => getIdFromPath(location), [location])
  const isOnTodosView = useMemo(() => isTodosRoute(location), [location])
  const scrollWrapperWidth = useCallback(() => {
    return pathOr('100%', ['current', 'clientWidth'], scrollWrapperEl)
  })

  useEffect(() => {
    scrollWrapperWidth()
  }, [])

  const isSelected = (group) => propEq('id', selectedId, group) && isOnTodosView

  return (
    <Groups>
      {
        loading && <div>We are loading something...</div>
      }
      {
        <RowItems>
          <ScrollContainer vertical={false}>
            <ScrollWrapper ref={scrollWrapperEl} elmWidth={scrollWrapperWidth}>
              {
                list && list
                  .filter(item => !isEmpty(prop('name', item)))
                  .map(item =>
                  <Link key={prop('id', item)} to={`/todos/${prop('id', item)}`}>
                    <RowItem>
                      <GroupName
                        selected={isSelected(item)}
                      >
                          {groupDisplayName(item)}
                      </GroupName>
                    </RowItem>
                  </Link>
                )
              }
            </ScrollWrapper>
          </ScrollContainer>
        </RowItems>
      }
    </Groups>
  )
}

export default withRouter(Row)

const ScrollWrapper = styled.div(props => `
  height: 100%;
  display: flex;
  align-items: center;
  width: ${prop('elmWidth', props)} ;
  justify-content: flex-start;
`)



const Groups = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1em;
  border-bottom: 1px solid #27292b;
  -webkit-box-shadow: 0px 3px 8px -3px #27292B; 
  box-shadow: 0px 3px 8px -3px #27292B;
  padding: .5em;
`

const RowItems = styled.div`
  width: 100%;
`

const RowItem = styled.div`
  display: inline-block;
  white-space:nowrap;
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