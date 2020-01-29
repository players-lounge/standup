import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import randomNumber from 'utilities/random-number'
import Stack from 'layouts/Stack'
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

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  background-color: #FFF;
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

export default () => {
  const [teamState, setTeamState] = useState({ teamMembersToGo, teamMembersGone, position: randomNumber({ max: teamMembersToGo.length })})
  const [time, setTime] = useState(undefined)

  const current = teamState.teamMembersToGo[teamState.position]

  useEffect(() => {
    var timerID = time && setInterval(() => tick(), 1000)

    return () => {
      clearInterval(timerID)
    }
  })

  const tick = () => {
    setTime(time - 1)
  }

  const nextPerson = () => {
    setTime(TIME_FOR_UPDATE)
    setTeamState(movePerson({ teamState, position: teamState.position }))
  }

  const StyledStrong = styled.strong`
    font-weight: bold;
  `

  const update = (current) => (
    <>Give your update: <StyledStrong>{current}</StyledStrong></>
  )

  return (
    <Stack>
      <Title>Standup</Title>
      <h2>{ time === undefined ? 'Get ready to start standup' : current ? update(current) : 'Stand up DONE!!!'}</h2>

      <p>
        {(time !== undefined && teamState.teamMembersToGo.length !== 0) ? `Time remaining: ${time}s` : ' _ '}
      </p>

      <p>
        Remaining Team Members: {teamState.teamMembersToGo.length}
      </p>

      <p>
        {time === undefined ? <button onClick={() => setTime(TIME_FOR_UPDATE)}>Start Standup</button> : ' '}
        {time !== undefined && teamState.teamMembersToGo.length !== 0 ? <button onClick={nextPerson}>Next Person</button> : ' '}
      </p>

      <TeamList inProgress={Boolean(time)} team={team} teamMembersGone={teamState.teamMembersGone} teamMembersToGo={teamState.teamMembersToGo} position={teamState.position} />

    </Stack>
  )
}
