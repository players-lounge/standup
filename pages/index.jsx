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
  background-color: ${({theme}) => theme.colors.background};
  background-color: #FFF;
`

const teamMembersToGo = [...team];
const teamMembersGone = [];

const movePerson = ({state: {teamMembersToGo, teamMembersGone}, position }) => {
  if (!teamMembersToGo[position]) return {teamMembersToGo, teamMembersGone}
  return {
    teamMembersToGo: teamMembersToGo.filter((_, index) => index !== position),
    teamMembersGone: [...teamMembersGone, teamMembersToGo[position]]
  }
}

export default () => {

  const [state, setState] = useState({teamMembersToGo, teamMembersGone});

  const position = randomNumber({max: state.teamMembersToGo.length})
  console.log(state)

  return (
  <Background>
    <Title>My page</Title>
    <p>
      Remaining Team Members: {state.teamMembersToGo.length}
    </p>
    {state.teamMembersToGo.length !== 0 ?<button onClick={() => setState(movePerson({state, position}))}>
      Click me to move {state.teamMembersToGo[position]}
    </button> : null}
    <ul>
      {team.map(member => state.teamMembersGone.includes(member) ? (<li key={member}>✅ {member}</li>) : (<li key={member}>{member}</li>))}
    </ul>
  </Background>
)}