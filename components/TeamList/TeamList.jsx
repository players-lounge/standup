import React from 'react'
import styled from 'styled-components'

const StyledUl = styled.ul`
  column-count: 3;
  column-gap: 40px;
  column-rule-style: solid;
`

const TeamList = ({ children }) => (
  <StyledUl>
    {children}
  </StyledUl>
)

export default TeamList
