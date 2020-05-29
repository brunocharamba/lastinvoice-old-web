import React from 'react'
import logo from '../../assets/images/logo_white_outline_small.png'
import { Container, Logo } from './styles'

function Header() {
  return (
    <Container>
      <Logo src={logo} alt="Seu Recibo" />
    </Container>
  )
}

export default Header
