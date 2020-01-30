import React from 'react'
import styled from 'styled-components'
import Name from 'components/Name'

const ActiveMemberLi = styled.li`
  background-color: ${({ theme }) => theme.colors.highlight};
  font-weight: bold;
  margin-bottom: 8px;
  margin-top: 8px;
`

const StyledLi = styled.li`
  margin-bottom: 8px;
  margin-top: 8px;
`

const nameLogic = ({ timing, teamMembersGone, teamMembersToGo, position, member }) => {
  if (!timing) return (<StyledLi key={member}><Name name={`${member}`}/></StyledLi>)

  if (teamMembersGone.includes(member)) return (<StyledLi key={member}><Name name={`✅ ${member}`}/></StyledLi>)

  if (teamMembersToGo[position] === member) return (<ActiveMemberLi key={member}><Name name={`${member}`}/></ActiveMemberLi>)
  return (<StyledLi key={member}><Name name={`${member}`}/></StyledLi>)
}

const TeamList = ({ timing, team, teamMembersGone, teamMembersToGo, position }) => (
  <ul>
    {team.map(member => nameLogic({
      timing,
      teamMembersGone,
      teamMembersToGo,
      position,
      member
    }))}
  </ul>
)

export default TeamList
