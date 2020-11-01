import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { createTypeAction } from 'utils/utils'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { setUserId } from './state'
import { prop } from 'ramda'
import { TODOS, GROUPS } from 'utils/constants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faCompress, faClipboardCheck, faObjectGroup } from '@fortawesome/free-solid-svg-icons'
import { Datetime } from 'components/Datetime'
import {
  Switch,
  Route,
  Link
} from "react-router-dom"
import { Icon } from 'components/Icon'
import { FullScreen } from 'components/FullScreen'

import * as Todos from 'components/Todos'
import * as Users from 'components/Users'
import * as Groups from 'components/Groups'

export const startApp = createTypeAction('startApp')


const App = () => {

  const dispatch = useDispatch()

  const [cookies] = useCookies()
  const id = prop('user', cookies)
  
  useEffect(() => {
    dispatch(startApp())
  }, [])
  
  useEffect(() => {
    dispatch(setUserId({ id }))
  }, [id])

  return (
  <div>  
    <AppWrapper>
      <FullScreen backgroundColor="#000">
        <AppHeader />
        <AppBody>
          <Groups.Row />
          <Switch>
            <Route path="/users/editor/:id">
              <Users.Editor />
            </Route>
            <Route path="/users">
              <Users.List />
            </Route>
            <Route path="/todos/editor/:id">
              <Todos.Editor />
            </Route>
            <Route path="/todos/:id">
              <Todos.List />
            </Route>
            <Route path="/groups/editor/:id">
              <Groups.Editor />
            </Route>
            <Route path="/groups">
              <Groups.List />
            </Route>
            <Route path="/">
              <Todos.List />
            </Route>
          </Switch>
        </AppBody>
      </FullScreen>
    </AppWrapper>
  </div>
  )
}

export default App

const AppHeader = ({
  isFullscreen,
  setIsFullscreen,
  handleExitFullscreen,
  fullScreenErrorMessage,
}) => {

  return (
    <>
      <AppHeaderWrapper>
        <HeaderItem>
          <Datetime />
        </HeaderItem>
        <HeaderItem>
          <Link to="/todos">
            <Icon type={TODOS}><FontAwesomeIcon icon={faClipboardCheck} /></Icon>
          </Link>
          <Spacer />
          <Link to="/groups">
            <Icon type={GROUPS}><FontAwesomeIcon icon={faObjectGroup} /></Icon>
          </Link>
          <Spacer />
          <Users.UsersMenu />
          <Spacer />
          <Controls>
            {fullScreenErrorMessage ? (null) : isFullscreen ? (
              <span onClick={handleExitFullscreen}><FontAwesomeIcon icon={faCompress} /></span>
            ) : (
              <span onClick={setIsFullscreen}><FontAwesomeIcon icon={faExpand} /></span>
            )}
          </Controls>
        </HeaderItem>
      </AppHeaderWrapper>
    </>
  )
}

const Controls = styled.div`
  background-color: #1E1E1E;
  border-radius: 3em;
  padding: 0 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  color: #fff;
  background-color: #1E1E1E;

  a {
    color: #fff;
    text-decoration: none;
  }

  svg.svg-inline--fa {
    &:hover {
      cursor: pointer;
    }
  }

  button,
  input[type="submit"] {
    cursor: pointer;

    background-image: linear-gradient(to right, #EB3349 0%, #F45C43  51%, #EB3349  100%);
    
    padding: 1em;
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
    
    &:disabled {
      opacity: 0.5;
      cursor: inherit;
    }
  }
`

const Spacer = styled.div`
  width: 0.25em;
`

const AppHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: .5em 1em;
  background-color: #000;
  border-bottom: 1px solid #27292b;
  -webkit-box-shadow: 0px 3px 8px -3px #27292B; 
  box-shadow: 0px 3px 8px -3px #27292B;
  align-items: center;
`

const HeaderItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const AppBody = styled.div`
`