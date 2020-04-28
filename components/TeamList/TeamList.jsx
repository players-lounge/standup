import React from 'react'
import styled from 'styled-components'
import Name from 'components/Name'

const ActiveMemberLi = styled.li`
  background-color: ${({ theme }) => theme.colors.highlight};
  font-weight: bold;
  margin-bottom: 8px;
  break-inside: avoid;
`

const StyledLi = styled.li`
  margin-bottom: 8px;
  break-inside: avoid;
`

const StyledUl = styled.ul`
  column-count: 3;
  column-gap: 40px;
  column-rule-style: solid;

`

const nameLogic = ({ timing, isReducedTeam, teamMembersGone, teamMembersToGo, position, member }) => {
  if (!timing) {
    return teamMembersGone.includes(member) ? <StyledLi key={member}><Name name={`✅ ${member}`}/></StyledLi> : <StyledLi key={member}><Name name={`${member}`}/></StyledLi>
  }

  if (teamMembersGone.includes(member)) return (<StyledLi key={member}><Name name={`✅ ${member}`}/></StyledLi>)

  if (teamMembersToGo[position] === member) return (<ActiveMemberLi key={member}><Name name={`${member}`}/></ActiveMemberLi>)
  return (<StyledLi key={member}><Name name={`${member}`}/></StyledLi>)
}

const TeamList = ({ timing, isReducedTeam, team, teamMembersGone, teamMembersToGo, position }) => (
  <StyledUl>
    {team.map(member => nameLogic({
      timing,
      isReducedTeam,
      teamMembersGone,
      teamMembersToGo,
      position,
      member
    }))}
  </StyledUl>
)

export default TeamList
