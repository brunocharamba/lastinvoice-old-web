import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Container, Top, Middle, Bottom } from './styles'

function MatModel({ emmiter }) {
  return (
    <Container>
      <Top>
        <div id="company">
          <Avatar id="logo" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.pg">
            LOGO
          </Avatar>
          <div id="logoTitle">
            <h1>{emmiter.name || '[NOME DA EMPRESA]'}</h1>
            <h4>{emmiter.site || '[SITE]'}</h4>
          </div>
        </div>
        <div id="client">
          <div id="period">
            <h1>RECIBO</h1>
            COMPRA 01 de Junho de 2020
          </div>
          <div id="details">
            <AccountCircleIcon style={{ fontSize: 80 }} />
            <div>
              <h5>[RECIFE, PE]</h5>
              <h2>[FULANO DA SILVA]</h2>
              <h5>000.000.000-00</h5>
            </div>
          </div>
        </div>
      </Top>
      <Middle></Middle>
      <Bottom></Bottom>
    </Container>
  )
}

export default MatModel
