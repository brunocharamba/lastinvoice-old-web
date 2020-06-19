import React from 'react'
import { Provider } from 'react-redux'

import styled, { createGlobalStyle } from 'styled-components'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import Store from './store'
import Routes from './routes'
import Header from './components/Header'

import { colors } from './styles'
import '@blueprintjs/core/lib/css/blueprint.css'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
  body, h1, h2, h3, h4, h5 {
    font-family: 'Montserrat', sans-serif;
  }
  html, body, #root, .app {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    /* padding: 0 0 20px 0;  */
    background-color: ${colors.clouds};

  }
  a {
    color: inherit;
  }
  a:hover {
    color: inherit; 
  }
`

const Container = styled.div`
  /* -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75); */

  & :first-child {
    /* flex: 0.1; */
  }

  & > :nth-child(1) {
    /* height: 80px !important; */
  }
`

function App() {
  return (
    <Provider store={Store}>
      <Container>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <GlobalStyle />
          {/* <Header></Header> */}
          <Routes></Routes>
        </MuiPickersUtilsProvider>
      </Container>
    </Provider>
  )
}

export default App
