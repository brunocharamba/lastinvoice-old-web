import React, { useState } from 'react'
import { FaFileAlt, FaRegCreditCard, FaBriefcase, FaBars } from 'react-icons/fa'
import { Drawer } from 'antd'

import { isMobile } from 'react-device-detect'

import { Container, Background, Wrapper, Top, Middle, Widgets, WidgetRow, Widget } from './styles'
import { colors } from '../../styles'

function Landing() {
  const [visible, setVisible] = useState(false)

  const renderMenu = () => {
    return !isMobile ? (
      <div>
        <a>
          <h2>planos</h2>
        </a>
        <a>
          <h2>ajuda</h2>
        </a>
        <h2>
          <a id="signup">registrar</a>
        </h2>
        <h2>
          <a id="login">login</a>
        </h2>
      </div>
    ) : (
      <div>
        <FaBars size={25} color={colors.clouds} onClick={() => setVisible(true)} />
        <Drawer title="Basic Drawer" placement="right" closable={false} onClose={() => setVisible(false)} visible={visible} key="right">
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    )
  }

  return (
    <Container>
      <Wrapper>
        <Top>
          <h1>SEURECIBO</h1>
          {renderMenu()}
        </Top>
        <Middle>
          <h1>Meio</h1>
        </Middle>
        <Widgets>
          <WidgetRow>
            <Widget color={colors.nephritis}>
              <FaFileAlt size={100} />
              <div>
                <h1>Recibo</h1>
                <span>simples</span>
              </div>
            </Widget>
            <Widget color={colors.belizeHole}>
              <FaRegCreditCard size={100} />
              <div>
                <h1>Nota</h1>
                <span>promissória</span>
              </div>
            </Widget>
            <Widget color={colors.belizeHole}>
              <FaRegCreditCard size={100} />
              <div>
                <h1>Nota</h1>
                <span>promissória</span>
              </div>
            </Widget>
          </WidgetRow>
          <WidgetRow>
            <Widget color={colors.amethyst}>
              <FaBriefcase size={100} />
              <div>
                <h1>Orçamento</h1>
                <span>serviço</span>
              </div>
            </Widget>
            <Widget soon color={colors.asbestos}>
              <FaFileAlt size={100}></FaFileAlt>
              <h2>Recibo</h2>
              <h3>EM BREVE</h3>
            </Widget>
          </WidgetRow>
        </Widgets>
        <Background />
      </Wrapper>
    </Container>
  )
}

export default Landing
