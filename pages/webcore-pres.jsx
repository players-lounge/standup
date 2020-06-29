import React, { useState } from 'react'
import styled from 'styled-components'
import randomNumber from 'utilities/random-number'
import useCustomPageUrl from 'utilities/use-page-url'
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
  'Dave L',
  'Dave M',
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
const nameLogic = ({ gone, position, toggleMember, standupPosition, member }) => {
  if (position === standupPosition) return (<ActiveMemberLi key={member}><Name name={`${member}`}/></ActiveMemberLi>)
  if (gone.includes(position)) return (<StyledLi key={member}><Name name={`✅ ${member}`} onClick={toggleMember}/></StyledLi>)
  return (<StyledLi key={member}><Name name={`${member}`} onClick={toggleMember}/></StyledLi>)
}

const movePerson = ({ toGo, gone, standupPosition }) => ({
  toGo: toGo.filter((val) => val !== standupPosition),
  gone: [...gone, standupPosition]
})

const standup = ({ toGo }) => {
  const index = randomNumber({ max: toGo.length })
  return toGo[index]
}

const update = (current) => (
  <>Give your update: <StyledStrong>{current}</StyledStrong></>
)

const Page = ({ team, gone = [], toGo }) => {
  const [state, setState] = useState({ toGo, gone })
  const [url, setUrl] = useState('')

  const startStandup = () => {
    setState({ ...state, active: true, standupPosition: standup({ toGo }) })
  }

  const nextPerson = () => {
    const newState = movePerson(state)
    const newStandupPosition = standup({ toGo: newState.toGo })
    setState({ ...newState, active: true, standupPosition: newStandupPosition })
  }

  const resetTeam = () => {
    setState({ toGo: team.map((_, index) => index), gone: [] })
  }

  const toggleMember = (memberPosition) => () => {
    let toGo
    let gone

    if (state.toGo.includes(memberPosition)) {
      gone = [...state.gone, memberPosition]
      toGo = state.toGo.filter(val => val !== memberPosition)
    } else {
      toGo = [...state.toGo, memberPosition]
      gone = state.gone.filter(val => val !== memberPosition)
    }

    console.log(state)
    setState({ ...state, gone, toGo })
  }

  if (typeof window !== 'undefined') {
    const newUrl = `${window.location.pathname}?gone=${JSON.stringify(state.gone)}`
    if (url !== newUrl) setUrl(newUrl)
    useCustomPageUrl(`${window.location.pathname}?gone=${JSON.stringify(state.gone)}`)
  }

  const left = (
    <Stack>
      <Title>Standup</Title>
      <Paragraph>{ update(team[state.standupPosition])}</Paragraph>

      <Paragraph>
        Remaining Team Members: {state.toGo.length}
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
        {!state.active ? <Button onClick={startStandup}><ButtonText>Start Standup</ButtonText></Button> : ' '}
        {state.active && state.toGo.length !== 0 ? <Button onClick={nextPerson}><ButtonText>Next Person</ButtonText></Button> : ' '}
        {state.active && state.toGo.length === 0 ? <Button onClick={resetTeam}><ButtonText>Reset Standup</ButtonText></Button> : ' '}
      </>

      <TeamList>
        {team.map((member, position) => nameLogic({
          gone: state.gone,
          standupPosition: state.standupPosition,
          position,
          toggleMember: toggleMember(position),
          member
        }))}
      </TeamList>

    </Stack>
  )
}

Page.getInitialProps = async (ctx) => {
  const goneString = ctx.query.gone || '[]'
  const goneObject = JSON.parse(goneString)
  const gone = goneObject
  const toGo = teamData.map((_, index) => index).filter((index) => !goneObject.includes(index))
  return { team: teamData, gone, toGo }
}

export default Page
