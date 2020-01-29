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

export default () => {
  const teamMembersToGo = team;
  const teamMembersGone = ['Adam'];

  const [state, setState] = useState({teamMembersToGo, teamMembersGone});

  return (
  <Background>
    <Title>My page</Title>
    <p>
      Remaining Team Members: {state.teamMembersToGo.length}
    </p>
    <button onClick={() => this.setState({ ...state })}>
      Click me to move {state.teamMembersToGo[randomNumber({max: team.length})]}
    </button>
    <ul>
      {team.map(member => teamMembersGone.includes(member) ? (<li key={member}>✅ {member}</li>) : (<li key={member}>{member}</li>))}
    </ul>
  </Background>
)}