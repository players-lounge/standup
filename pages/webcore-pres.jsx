import React, { useState, useEffect } from 'react'
import lightFormat from 'date-fns/lightFormat'
import fromUnixTime from 'date-fns/fromUnixTime'
import styled from 'styled-components'
import randomNumber from 'utilities/random-number'
import Stack from 'layouts/Stack'
import Sidebar from 'layouts/Sidebar'
import TeamList from 'components/TeamList'
import Paragraph from 'components/Paragraph'

const team = [
  'Abigail',
  'Ben (8am-4pm)',
  'Carlos',
  'Callum',
  'Dave',
  'Dom \'not\' the legend',
  'Edwina',
  'Jacob',
  'Joe',
  'Johnathan',
  'Josh',
  'Keith M',
  'Matt C',
  'Mike',
  'Pete',
  'Si',
  'Sophie',
  'Tim',
]

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
  margin: 5px;
`

const ButtonText = styled.p`
  font-size: 1rem;
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
  const [teamState, setTeamState] = useState({ teamMembersToGo, teamMembersGone, position: randomNumber({ max: teamMembersToGo.length }) })
  const [totalTime, setTotalTime] = useState(0)
  const [timing, startTiming] = useState(false)
  const [onlyPresLayerTeam, setOnlyPresLayerTeam] = useState(false)
  const [regularDrop, setRegularDrop] = useState(false)

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

  const dropTeamMembers = (toDrop) => {
    const teamMembersGone = [...toDrop, ...teamState.teamMembersGone]

    const teamMembersToGo = teamState.teamMembersToGo.filter(member => {
      return !teamMembersGone.includes(member)
    })

    setTeamState({ teamMembersToGo, teamMembersGone, position: randomNumber({ max: teamMembersToGo.length }) })
  }

  const resetTeam = () => {
    setTeamState({ teamMembersToGo: [...team], teamMembersGone: [], position: randomNumber({ max: team.length }) })
    setRegularDrop(false)
    setOnlyPresLayerTeam(false)
    setTotalTime(0)
    startTiming(false)
  }

  const reduceTeam = (toDrop) => {
    dropTeamMembers(toDrop)
    setOnlyPresLayerTeam(true)
  }

  const expandTeam = () => {
    resetTeam()
    setOnlyPresLayerTeam(false)
  }

  const regularOutOfOffice = () => {
    const outOfOfficeRota = {
      1: ['Abigail'], // Monday
      2: [],
      3: [],
      4: [],
      5: []
    }

    const outOfOffice = outOfOfficeRota[new Date().getDay()]
    dropTeamMembers(outOfOffice)
  }

  if (!regularDrop) {
    regularOutOfOffice()
    setRegularDrop(true)
  }

  const averageTimePerPerson = teamState.teamMembersGone.length
    ? Math.floor(totalTime / teamState.teamMembersGone.length)
    : 0

  const left = (
    <Stack>
      <Title>Standup</Title>
      <Paragraph>{ !timing ? 'Get ready to start standup' : current ? update(current) : 'Stand up DONE!!!'}</Paragraph>

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
            {lightFormat(fromUnixTime(totalTime), 'mm:ss')}
          </StyledStrong>
        </Title>
        <Paragraph>Total Time Elapsed</Paragraph>
        <Paragraph>Average Time per Person: {averageTimePerPerson}s</Paragraph>
      </Stack>
    </RightWrapper>
  )

  const teamToDrop = [
    'Callum',
    'Edwina',
    'Johnathan',
    'Keith M',
    'Mike'
  ]

  const thanosButton = (
    <Button onClick={() => reduceTeam(teamToDrop)}>
      <ButtonText>{
        `Thanos Mode (less than ${team.length + 1 - (teamToDrop.length + teamState.teamMembersGone.length)} on the call?)`
      }
      </ButtonText>
    </Button>
  )

  const resurrectButton = (
    <Button onClick={() => expandTeam()}><ButtonText>Resurrect</ButtonText></Button>
  )

  return (
    <Stack>
      <StyledSidebar left={left} right={right} sidebarOnRight/>

      <>
        {!timing ? <Button onClick={() => startTiming(true)}><ButtonText>Start Standup</ButtonText></Button> : ' '}
        {timing && teamState.teamMembersToGo.length !== 0 ? <Button onClick={nextPerson}><ButtonText>Next Person</ButtonText></Button> : ' '}
        {timing && teamState.teamMembersToGo.length === 0 ? <Button onClick={() => resetTeam()}><ButtonText>Reset Standup</ButtonText></Button> : ' '}
        {onlyPresLayerTeam ? resurrectButton : thanosButton }
      </>

      <TeamList
        timing={timing}
        isReducedTeam={onlyPresLayerTeam || regularDrop}
        team={team}
        teamMembersGone={teamState.teamMembersGone}
        teamMembersToGo={teamState.teamMembersToGo}
        position={teamState.position}
      />

    </Stack>
  )
}
