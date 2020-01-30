import React from 'react'
import styled from 'styled-components'

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.colors.primary}
`

const Paragraph = ({ children }) => (
  <StyledParagraph>
    {children}
  </StyledParagraph>
)

export default Paragraph
