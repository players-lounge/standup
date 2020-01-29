import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  padding: 0.5rem;
  border: 1px solid black;
`

const Name = ({ name }) => (
  <StyledDiv>
    {name}
  </StyledDiv>
)

export default Name
