import React from 'react'
import styled from '@emotion/styled'

import { Link } from 'react-router-dom'

const UserMenu = () => {

  return <>
    <Link to={`/users`}>
      <UserIcon>
        <UserLabel></UserLabel>
      </UserIcon>
    </Link>
  </>
}

export default UserMenu

const UserIcon = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 50%;

  background-color: #a00b00;
  border: 0.1em solid #fff;
`

const UserLabel = styled.span`
  font-size: 1.5em;
  position: relative;
  left: 0.28em;
  bottom: 0.2em;
`