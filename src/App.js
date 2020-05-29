import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Routes from './routes'
import Header from './components/Header'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
  body, h1, h2, h3, h4, h5 {
    font-family: 'Montserrat', sans-serif;
  }
  html, body, #root, .app {
    margin: 0px 20px;
    padding: 0; 
    height: 100%;
  }
  a {
    color: inherit;
  }
  a:hover {
    color: inherit; 
  }
`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100% !important;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);

  & :first-child {
    flex: 0.1;
  }
`

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Header></Header>
      <Routes></Routes>
    </Container>
  )
}

export default App
