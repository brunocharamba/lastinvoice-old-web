import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'

import logo from '../../assets/images/logo_white_outline_small.png'
import { FaBars } from 'react-icons/fa'
import { Container, StyledDrawer } from './styles'
import { colors } from '../../styles'

function Header() {
  const [visible, setVisible] = useState(false)

  const renderMenu = () => {
    return !isMobile ? (
      <div>
        <h3>
          <a title="Ver planos">planos</a>
        </h3>
        <h3>
          <a>ajuda</a>
        </h3>
        <h3>
          <a id="signup">registrar</a>
        </h3>
        <h3>
          <a id="login">login</a>
        </h3>
      </div>
    ) : (
      <div>
        <FaBars size={25} color={colors.clouds} onClick={() => setVisible(true)} />
        <StyledDrawer placement="right" closable={true} onClose={() => setVisible(false)} visible={visible} key="right">
          <div>
            <h2>
              <a>planos</a>
            </h2>
            <h2>
              <a>ajuda</a>
            </h2>
            <h2>
              <a id="signup">registrar</a>
            </h2>
            <h2>
              <a id="login">login</a>
            </h2>
          </div>
        </StyledDrawer>
      </div>
    )
  }

  return (
    <Container>
      <h1>SEURECIBO</h1>
      {renderMenu()}
    </Container>
  )
}

export default Header
