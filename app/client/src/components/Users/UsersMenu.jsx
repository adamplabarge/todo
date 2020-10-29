import React from 'react'
import styled from '@emotion/styled'
import { useSelector, getFirstLetter } from 'utils/utils'
import { selectUserId } from 'components/App/state'
import { propOr, prop } from 'ramda'
import {
  selectEntityStrict as selectUserStrict,
  selectHasList as selectHasUsers
} from 'components/Users/state'

import { Link } from 'react-router-dom'

const UserMenu = () => {
  const id = useSelector(selectUserId)
  const user = useSelector(selectUserStrict, { id })
  const hasUsers = useSelector(selectHasUsers)
  const firstLetter = getFirstLetter(prop('name', user))

  return <>
    {
      !hasUsers && <span>Click here to add a user... &nbsp;</span>
    }
    <Link to={`/users`}>
      <UserIcon color={propOr('', 'icon', user)}>
        <UserLabel>{firstLetter || `+`}</UserLabel>
      </UserIcon>
    </Link>
  </>
}

export default UserMenu

export const UserIcon = styled.div(props => `
  width: 2em;
  height: 2em;
  border-radius: 50%;

  background-color: ${prop('color', props)};
  ${!prop('color', props) && `background-image: linear-gradient(to right, #f857a6 0%, #ff5858  51%, #f857a6  100%);`}
  border: 0.1em solid #fff;

  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`)

const UserLabel = styled.span`
  font-size: 1.5em;
  color: #fff;
`