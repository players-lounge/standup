import React from 'react'
import styled from 'styled-components'
import Paragraph from 'components/Paragraph'

const StyledDiv = styled.div`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const Name = ({ name, className }) => (
    <StyledDiv className={className}>
      <Paragraph>
        {name}
      </Paragraph>
    </StyledDiv>
  )

export default Name
