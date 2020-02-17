import React from 'react'
import styled from 'styled-components'
import Paragraph from 'components/Paragraph'

const StyledDiv = styled.div`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const AustrailianDiv = styled.div`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transform: rotate(180deg);
`

const Name = ({ name, className }) => name === 'Dom' || name === '✅ Dom'
  ? (
    <AustrailianDiv className={className}>
      <Paragraph>
        {name}
      </Paragraph>
    </AustrailianDiv>
  )
  : (
    <StyledDiv className={className}>
      <Paragraph>
        {name}
      </Paragraph>
    </StyledDiv>
  )

export default Name
