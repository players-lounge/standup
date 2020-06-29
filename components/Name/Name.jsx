import React from 'react'
import styled from 'styled-components'
import Paragraph from 'components/Paragraph'

const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  height: 3rem;
  background-color: inherit;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};;
  outline: 0px;
  text-align: left;
  font-size: 105%;
  :hover{
    font-weight: 700;
    cursor: pointer;
  }
`

const Name = ({ name, onClick, className }) => (
  <Button onClick={onClick} className={className}>
    <Paragraph>
      {name}
    </Paragraph>
  </Button>
)

export default Name
