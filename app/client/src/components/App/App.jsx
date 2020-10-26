import React from 'react'
import styled from '@emotion/styled'

import { Todos } from 'components/Todos'
import { Datetime } from 'components/Datetime'
import { UserMenu } from 'components/Users'
import { Groups } from 'components/Groups'

function App() {
  return (
    <AppWrapper>
      <AppHeader>
        <Datetime />
        <UserMenu />
      </AppHeader>
      <Todos />
    </AppWrapper>
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