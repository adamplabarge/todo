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
import { Icon } from 'components/Icon'

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
      <Icon color={propOr('', 'icon', user)}>
        <UserLabel>{firstLetter || `+`}</UserLabel>
      </Icon>
    </Link>
  </>
}

export default UserMenu

const UserLabel = styled.span`
  font-size: 1.5em;
  color: #fff;
`