import React from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'utils/utils'
import { selectUserId } from 'components/App/state'
import { compose, head, split, propOr } from 'ramda'
import { selectEntityStrict as selectUserStrict } from 'components/Users/state'

import { Link } from 'react-router-dom'

const UserMenu = () => {
  const id = useSelector(selectUserId)
  const user = useSelector(selectUserStrict, { id })
  const firstLetter = compose(
    head,
    split(''),
    propOr('', 'name')
  )(user)

  return <>
    <Link to={`/users`}>
      <UserIcon iconColor={propOr('#FFE9BB', 'icon', user)}>
        <UserLabel>{firstLetter}</UserLabel>
      </UserIcon>
    </Link>
  </>
}

export default UserMenu

const UserIcon = styled.div(props => `
  width: 2em;
  height: 2em;
  border-radius: 50%;

  background-color: ${props.iconColor};
  border: 0.1em solid #fff;
`)

const UserLabel = styled.span`
  font-size: 1.5em;
  position: relative;
  left: 0.28em;
  bottom: 0.2em;
  color: #fff;
`