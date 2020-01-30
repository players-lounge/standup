import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};;
`

const Name = ({ name, className }) => (
  <StyledDiv className={className}>
    {name}
  </StyledDiv>
)

export default Name
