import styled from 'styled-components'
import { colors } from '../../styles'
import back from '../../assets/images/back1.jpg'

const Container = styled.div`
  height: 100vh;
`

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -99;
  background: url(${back}) center center no-repeat;
  background-size: cover;
  z-index: 1;
  &:before {
    z-index: -99;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to bottom, #000, ${colors.belizeHole});
    opacity: 0.7;
  }
`

const Wrapper = styled.div`
  z-index: 20;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`

const Top = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  padding: 20px 30px;
  z-index: 200;

  & * {
    z-index: 200;
  }

  a,
  a:hover {
    text-decoration: none;
  }

  & h1 {
    color: ${colors.clouds};
  }

  & div {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    margin: 5px 0 0 0;

    & h2 {
      margin: 0 0 0 40px;
      color: ${colors.clouds};
    }

    #signup,
    #login {
      padding: 10px;
      border: 1px solid ${colors.clouds};
    }
  }
`

const Middle = styled.div``

const Widgets = styled.div`
  z-index: 100;
  display: flex;
  flex: 0.5;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const WidgetRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Widget = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  height: 150px;
  width: 250px;
  min-width: 250px;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  background-color: ${(props) => props.color};

  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.8);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.025);
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0 10px 0 0;
    border-right: 4px solid ${colors.clouds};
    border-radius: 3px;

    & h1 {
      font-size: 22px;
      font-weight: bold;
      text-transform: uppercase;
    }

    & span {
      font-size: 15px;
      font-weight: bold;
      margin: -5px 0 0 0;
      color: ${colors.clouds};
    }
  }

  & :nth-child(1) {
    margin: 0 0 0 -50px;
    size: 100;
    color: ${colors.clouds};
  }

  & h3 {
    display: block;
    position: absolute;
    align-self: center;
    text-align: center;
    text-transform: uppercase;
    margin: 0 0 0 -10px;
    padding: 10px 0;
    width: 250px;
    color: ${colors.clouds};
    background-color: ${colors.alizarin};
  }
`

export { Container, Background, Wrapper, Top, Middle, Widgets, WidgetRow, Widget }
