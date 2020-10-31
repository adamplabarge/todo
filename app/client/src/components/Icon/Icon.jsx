import React from 'react'
import styled from '@emotion/styled'
import { prop } from 'ramda'
import { stylesIf } from 'utils/utils'
import { TODOS, GROUPS } from 'utils/constants'

const typesStyle = {
  [TODOS]: `background-image: linear-gradient(to right, #f857a6 0%, #ff5858  51%, #f857a6  100%);`,
  [GROUPS]: `background-image: linear-gradient(to right, rgba(31, 162, 255, .8) 0%, #12D8FA  51%, rgba(31, 162, 255, .5)  100%);`
}

const Icon = ({ children, color, type }) => <>
  <StyledIcon color={color} type={type}>
    {children}
  </StyledIcon>
</>

export default Icon

const StyledIcon = styled.div(props => `
  width: 2em;
  height: 2em;
  border-radius: 50%;

  background-color: ${prop('color', props)};
  ${stylesIf(!prop('color', props), prop(props.type, typesStyle))}
  border: 0.1em solid #fff;

  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`)