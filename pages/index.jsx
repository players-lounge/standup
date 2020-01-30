import React, { useState, useEffect} from 'react'
import lightFormat from 'date-fns/lightFormat'
import fromUnixTime from 'date-fns/fromUnixTime'
import styled from 'styled-components'
import randomNumber from 'utilities/random-number'
import Stack from 'layouts/Stack'
import Sidebar from 'layouts/Sidebar'
import TeamList from 'components/TeamList'

const TIME_FOR_UPDATE = 60

const team = [
  'Adam',
  'Abigail',
  'Andrew',
  'Ben',
  'Carlos',
  'Dom',
  'Edwina',
  'Joe',
  'Johnathan',
  'Josh',
  'Keith',
  'Matt C',
  'Matt L',
  'Mike',
  'Rich',
  'Ross',
  'Si',
  'Sophie',
  'Tim',
]

const Title = styled.h1`
  font-size: 50px;
`

const StyledStrong = styled.strong`
  font-weight: bold;
`

const StyledSidebar = styled(Sidebar)`
  padding-top: ${({ theme }) => theme.spacing.base}
`

const RightWrapper = styled.div`
  text-align: right;
`

const teamMembersToGo = [...team]
const teamMembersGone = []

const movePerson = ({ teamState: { teamMembersToGo, teamMembersGone }, position }) => {
  if (!teamMembersToGo[position]) return { teamMembersToGo, teamMembersGone }
  return {
    teamMembersToGo: teamMembersToGo.filter((_, index) => index !== position),
    teamMembersGone: [...teamMembersGone, teamMembersToGo[position]],
    position: teamMembersToGo.length >= 1 && randomNumber({ max: teamMembersToGo.length - 1 })
  }
}

const update = (current) => (
  <>Give your update: <StyledStrong>{current}</StyledStrong></>
)

const tick = ({ teamState, totalTime, setTotalTime }) => {
  teamState.teamMembersToGo.length !== 0 && setTotalTime(totalTime + 1)
}

export default () => {
  const [teamState, setTeamState] = useState({ teamMembersToGo, teamMembersGone, position: randomNumber({ max: teamMembersToGo.length })})
  const [totalTime, setTotalTime] = useState(0)
  const [timing, startTiming] = useState(false)

  const current = teamState.teamMembersToGo[teamState.position]

  useEffect(() => {
    var timerID = timing && setInterval(() => tick({ teamState, totalTime, setTotalTime }), 1000)

    return () => {
      clearInterval(timerID)
    }
  })

  const nextPerson = () => {
    setTeamState(movePerson({ teamState, position: teamState.position }))
  }

  const right = (
    <RightWrapper>
      <Title>
        <StyledStrong>
          {lightFormat(fromUnixTime(totalTime), 'mm:ss')}
        </StyledStrong>
      </Title>
      <p>Total Time Elapsed</p>
    </RightWrapper>
  )

  const left = (
    <>
      <Title>Standup</Title>
      <h2>{ !timing ? 'Get ready to start standup' : current ? update(current) : 'Stand up DONE!!!'}</h2>

      <p>
        Remaining Team Members: {teamState.teamMembersToGo.length}
      </p>

      <p>
        {!timing ? <button onClick={() => startTiming(true)}>Start Standup</button> : ' '}
        {timing && teamState.teamMembersToGo.length !== 0 ? <button onClick={nextPerson}>Next Person</button> : ' '}
      </p>
    </>
  )

  return (
    <Stack>
      <StyledSidebar left={left} right={right} sidebarOnRight/>

      <TeamList
        timing={timing}
        team={team}
        teamMembersGone={teamState.teamMembersGone}
        teamMembersToGo={teamState.teamMembersToGo}
        position={teamState.position}
      />

    </Stack>
  )
}
