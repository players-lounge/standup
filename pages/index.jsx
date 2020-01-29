import React, { useState } from 'react'
import styled from 'styled-components'
import randomNumber from 'utilities/random-number'

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
  color: ${({ theme }) => theme.colors.primary};
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
    teamMembersGone: [...teamMembersGone, teamMembersToGo[position]]
  }
}

export default () => {
  const [teamState, setTeamState] = useState({ teamMembersToGo, teamMembersGone })

  const position = randomNumber({ max: teamState.teamMembersToGo.length })
  console.log(teamState)

  const current = teamState.teamMembersToGo[position]

  return (
    <div>
      <h1>Standup</h1>
      <h2>{ current ? `Give your update: ${current}` : 'Stand up DONE!!!'}</h2>
      <p>
      Remaining Team Members: {teamState.teamMembersToGo.length}
      </p>
      {teamState.teamMembersToGo.length !== 0 ? <button onClick={() => setTeamState(movePerson({ teamState, position }))}>
      Next Person
      </button> : null}
      <ul>
        {team.map(member => teamState.teamMembersGone.includes(member) ? (<li key={member}>✅ {member}</li>) : (<li key={member}>{member}</li>))}
      </ul>
    </div>
  )
}
