import React from 'react'
import Clock from 'react-live-clock'
import styled from '@emotion/styled'

const Datetime = () => {
  return(
    <StyledClock
      format={'dddd, MMMM Mo, h:mm:ss'}
      ticking={true}
      timezone={'US/Pacific'}
    />
  )
}

export default Datetime

const StyledClock = styled(Clock)`
`