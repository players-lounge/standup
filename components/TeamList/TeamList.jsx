import React from 'react'
import styled from 'styled-components'
import Name from 'components/Name'

const ActiveMemberLi = styled.li`
  font-weight: bold;
  background-color: lightgreen;
`

const nameLogic = ({ time, teamMembersGone, teamMembersToGo, position, member }) => {
  if (time === undefined) return (<li key={member}><Name name={`${member}`}/></li>)

  if (teamMembersGone.includes(member)) return (<li key={member}><Name name={`✅ ${member}`}/></li>)

  if (teamMembersToGo[position] === member) return (<ActiveMemberLi key={member}><Name name={`${member}`}/></ActiveMemberLi>)
  return (<li key={member}><Name name={`${member}`}/></li>)
}

const TeamList = ({ time, team, teamMembersGone, teamMembersToGo, position}) => (
  <ul>
    {team.map(member => nameLogic({
      time,
      teamMembersGone,
      teamMembersToGo,
      position,
      member
    }))}
  </ul>
)

export default TeamList
