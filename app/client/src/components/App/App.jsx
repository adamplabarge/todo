import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { createTypeAction } from 'utils/utils'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { setUserId } from './state'
import { prop } from 'ramda'

import { Datetime } from 'components/Datetime'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

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
    <Router>
      <AppWrapper>
        <AppHeader>
          <HeaderItem>
            <Datetime />
          </HeaderItem>
          <HeaderItem>
            <Link to="/todos"><span style={{marginRight: '1em'}}>Todos</span></Link>
            <Users.UsersMenu />
          </HeaderItem>
        </AppHeader>
        <AppBody>
          <Groups.List>
          </Groups.List>
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
            <Route path="/todos">
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
  background-color: #1E1E1E;

  a {
    color: #fff;
    text-decoration: none;
  }

  button,
  input[type="submit"] {
    cursor: pointer;

    background-image: linear-gradient(to right, #232526 0%, #414345  51%, #232526  100%);
    margin: .5em;
    padding: .5em 1em;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    border-radius: 1em;
    display: block;
    border: solid #fff 0.1em;

    &:hover {
      background-position: right center; /* change the direction of the change here */
      color: #fff;
      text-decoration: none;
    }        
  }
`

const AppHeader = styled.div`
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