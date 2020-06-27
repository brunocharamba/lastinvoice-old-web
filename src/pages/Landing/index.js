import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FaFileAlt, FaRegCreditCard, FaBriefcase, FaBars, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa'
import { isMobile } from 'react-device-detect'

import { Menu, Dropdown, Button, message, Tooltip } from 'antd'

import { Container, Background, Wrapper, Top, Middle, Announcement, Widgets, WidgetRow, Widget, StyledDrawer } from './styles'
import { colors } from '../../styles'

function Landing() {
  const [visible, setVisible] = useState(false)
  const history = useHistory()

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

  const renderFooter = () => {
    return (
      <>
        <div>LastReceipt © 2020</div>
        <div>
          <a>Privacidade</a>
        </div>
        <div>
          <a>Contato</a>
        </div>
        <div id="networks">
          <a href="https://twitter.com/google" target="_blank" rel="noreferrer">
            <FaTwitter size={20} />
          </a>
          <a href="https://twitter.com/google" target="_blank" rel="noreferrer">
            <FaFacebook size={20} />
          </a>
          <a href="https://twitter.com/google" target="_blank" rel="noreferrer">
            <FaLinkedin size={20} />
          </a>
        </div>
      </>
    )
  }

  return (
    <Container>
      <Background />
      <Wrapper>
        <Top>
          <h1>SEURECIBO</h1>
          {renderMenu()}
        </Top>
        <Middle>
          <h1>Emita e imprima seus recibos aqui, gratuitamente!</h1>
          <h3>Compra e venda, orçamentos e outros modelos disponíveis</h3>
        </Middle>
        <Widgets>
          <WidgetRow>
            <Widget color={colors.nephritis} onClick={() => history.push('/invoice')}>
              <FaFileAlt size={100} />
              <div>
                <h1>Recibo</h1>
                <span>compra e venda</span>
              </div>
            </Widget>
            <Widget color={colors.belizeHole}>
              <FaRegCreditCard size={100} />
              <div>
                <h1>Recibo</h1>
                <span>aluguel</span>
              </div>
            </Widget>
            <Widget color={colors.orange}>
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
            <Widget soon color={colors.asbestos}>
              <FaFileAlt size={100}></FaFileAlt>
              <h2>Recibo</h2>
              <h3>EM BREVE</h3>
            </Widget>
          </WidgetRow>
        </Widgets>
      </Wrapper>
      <Announcement>{renderFooter()}</Announcement>
    </Container>
  )
}

export default Landing
