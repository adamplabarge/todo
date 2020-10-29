import React from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'utils/utils'
import { selectUserId } from 'components/App/state'
import { compose, head, split, propOr, prop } from 'ramda'
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
      <UserIcon color={propOr('', 'icon', user)}>
        <UserLabel>{firstLetter || `+`}</UserLabel>
      </UserIcon>
    </Link>
  </>
}

export default UserMenu

const UserIcon = styled.div(props => `
  width: 2em;
  height: 2em;
  border-radius: 50%;

  background-color: ${prop('color', props)};
  ${!prop('color', props) && `background-image: linear-gradient(to right, #f857a6 0%, #ff5858  51%, #f857a6  100%);`}
  border: 0.1em solid #fff;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`)

const UserLabel = styled.span`
  font-size: 1.5em;
  color: #fff;
`