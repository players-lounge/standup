import React from 'react'
import styled from 'styled-components'

const StyledStack = styled.div`
  > * {
    margin-top: 0;
    margin-bottom: 0;
} 

  ${({ theme, recursive }) => recursive
    ? `* + * {margin-top: ${theme.spacing.base};}`
    : `> * + * {margin-top: ${theme.spacing.base};}`
}
`

const Stack = ({ children, className, recursive }) => (
  <StyledStack className={className} recursive={recursive}>
    {children.map((child, key) => <div key={key}>{child}</div>)}
  </StyledStack>
)

export default Stack
