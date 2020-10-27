import React, { useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import { createTypeAction } from 'utils'
import { useDispatch, useSelector } from 'react-redux'
import { USERS, GROUPS, TODOS } from '../../constants'
import { path } from 'ramda'

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

const startUpViews = {
  [USERS]: <Users.Editor />,
  [GROUPS]: <Groups.Editor />,
  [TODOS]: <Todos.Editor />
}

const hasListPath = path(['state', 'selectHasList'])

const App = () => {
  const dispatch = useDispatch()

  const hasUsers = useSelector(hasListPath(Users))
  const hasGroups = useSelector(hasListPath(Groups))

  // const view = useMemo(
  //   () => hasUsers ? hasGroups ? TODOS : GROUPS : USERS,
  //   [hasUsers, hasGroups]
  // )

  const view = USERS

  const StartUpView = startUpViews[view]

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
              {
                StartUpView
              }
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
  padding: 1em;
`