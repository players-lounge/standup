import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledStrong = styled.strong`
  font-weight: bold;
`

const TIME = 60

const Countdown = ({ active, activeUser }) => {
  const [timer, setTimer] = useState(null)
  const [timeLeft, setTimeLeft] = useState(TIME)

  const start = () => {
    setTimer(setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(tl => tl - 1)
      } else {
        clearInterval(timer)
      }
    }, 1000))
  }

  const stop = () => {
    clearInterval(timer)
  }

  const reset = () => {
    setTimeLeft(TIME)
  }

  useEffect(() => {
    if (active) {
      start()
    } else {
      stop()
    }
  }, [active])

  useEffect(() => {
    reset()
  }, [activeUser])

  return (
    <StyledStrong>
      {active ? timeLeft : 'Not Started'}
    </StyledStrong>
  )
}

export default Countdown
