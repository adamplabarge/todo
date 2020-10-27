import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { createTypeAction } from 'utils'
import { useDispatch } from 'react-redux'

import { Datetime } from 'components/Datetime'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import * as Todos from 'components/Todos'
import * as Users from 'components/Users'
import * as Groups from 'components/Groups'

export const startApp = createTypeAction('startApp')

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(startApp())
  }, [])

  return (
    <Router>
      <AppWrapper>
        <AppHeader>
          <Datetime />
          <Users.UsersMenu />
        </AppHeader>
        <AppBody>
          <Switch>
            <Route path="/users">
              <Users.List />
            </Route>
            <Route path="/users/editor">
              <Users.Editor />
            </Route>
            <Route path="/todos">
              <Todos.List />
            </Route>
            <Route path="/todos/editor">
              <Todos.Editor />
            </Route>
            <Route path="/groups">
              <Groups.List />
            </Route>
            <Route path="/groups/editor">
              <Groups.Editor />
            </Route>
            <Route path="/">
              <Todos.List />
            </Route>
          </Switch>
        </AppBody>
      </AppWrapper>
    </Router>
  )
}

export default App

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  color: #fff;
  background-color: #000;
`

const AppHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: .5em 1em;
  border-bottom: 1px solid #27292b;
  -webkit-box-shadow: 0px 3px 8px -3px #27292B; 
  box-shadow: 0px 3px 8px -3px #27292B;
  align-items: center;
`

const AppBody = styled.div`
`