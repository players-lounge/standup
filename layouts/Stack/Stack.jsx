import React from 'react'
import styled from 'styled-components'

const StyledStack = styled.div`
  > * {
    margin-top: 0;
    margin-bottom: 0;
} 

  ${({ theme, recursive }) => recursive
    ? `* + * {margin-top: 2rem;}`
    : `> * + * {margin-top: 2rem;}`
}
`

const Stack = ({ children, recursive }) => (
  <StyledStack recursive={recursive}>
    {children.map((child, key) => <div key={key}>{child}</div>)}
  </StyledStack>
)

export default Stack
