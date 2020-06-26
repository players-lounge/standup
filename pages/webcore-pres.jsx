import React, { useState, useEffect } from 'react'
import lightFormat from 'date-fns/lightFormat'
import fromUnixTime from 'date-fns/fromUnixTime'
import styled from 'styled-components'
import randomNumber from 'utilities/random-number'
import Stack from 'layouts/Stack'
import Sidebar from 'layouts/Sidebar'
import TeamList from 'components/TeamList'
import Paragraph from 'components/Paragraph'
import Name from 'components/Name'

const teamData = [
  'Abigail',
  'Ben (8am-4pm)',
  'Carlos',
  'Caroline',
  'Dave',
  'Edwina',
  'Graeme',
  'Jacob',
  'Joe',
  'Johnathan',
  'Josh',
  'Keith M',
  'Lew',
  'Matt C',
  'Matt W',
  'Mike',
  'Pete',
  'Saral',
  'Si',
  'Sophie',
  'Tim',
]

// const teamToDrop = [
//   'Callum',
//   'Caroline',
//   'Edwina',
//   'Graeme',
//   'Johnathan',
//   'Keith M',
//   'Mike'
// ]

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary}
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

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.background};;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};;
  height: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: 0px;

  :hover{
    text-decoration: underline;
    font-weight: 700;
    cursor: pointer;
  }
`
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

const ButtonText = styled.p`
  font-size: 1rem;
`
const nameLogic = ({ teamMembersGone, teamMembersToGo, position, member }) => {
  if (teamMembersGone.includes(member)) return (<StyledLi key={member}><Name name={`✅ ${member}`}/></StyledLi>)

  if (teamMembersToGo[position] === member) return (<ActiveMemberLi key={member}><Name name={`${member}`}/></ActiveMemberLi>)
  return (<StyledLi key={member}><Name name={`${member}`}/></StyledLi>)
}

const Page = ({ team, teamMembersGone = [], teamMembersToGo = team }) => {
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

  console.log(teamMembersToGo, teamMembersGone)

  const [teamState, setTeamState] = useState({ teamMembersToGo, teamMembersGone, position: randomNumber({ max: teamMembersToGo.length }) })

  const current = teamState.teamMembersToGo[teamState.position]

  const nextPerson = () => {
    setTeamState(movePerson({ teamState, position: teamState.position }))
  }

  const resetTeam = () => {
    setTeamState({ teamMembersToGo: [...team], teamMembersGone: [], position: randomNumber({ max: team.length }) })
  }

  const left = (
    <Stack>
      <Title>Standup</Title>
      <Paragraph>{ update(current)}</Paragraph>

      <Paragraph>
        Remaining Team Members: {teamState.teamMembersToGo.length}
      </Paragraph>

    </Stack>
  )

  const right = (
    <RightWrapper>
      <Stack>
        <Title>
          <StyledStrong>
            NO Time
          </StyledStrong>
        </Title>
        <Paragraph>Total Time Elapsed</Paragraph>
        <Paragraph>Average Time per Person: </Paragraph>
      </Stack>
    </RightWrapper>
  )

  return (
    <Stack>
      <StyledSidebar left={left} right={right} sidebarOnRight/>

      <>
        {teamState.teamMembersToGo.length !== 0 ? <Button onClick={nextPerson}><ButtonText>Next Person</ButtonText></Button> : ' '}
        {teamState.teamMembersToGo.length === 0 ? <Button onClick={() => resetTeam()}><ButtonText>Reset Standup</ButtonText></Button> : ' '}
      </>

      <TeamList>
        {team.map(member => nameLogic({
          teamMembersGone: teamState.teamMembersGone,
          teamMembersToGo: teamState.teamMembersToGo,
          position: teamState.position,
          member
        }))}
      </TeamList>

    </Stack>
  )
}

Page.getInitialProps = async (ctx) => {
  const { gone = '[]' } = ctx.query
  const teamMembersGone = teamData.filter((_, index) => JSON.parse(gone).includes(index))
  const teamMembersToGo = teamData.filter(member => !gone.includes(member))
  return { team: teamData, teamMembersGone, teamMembersToGo }
}

export default Page
