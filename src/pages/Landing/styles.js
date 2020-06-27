import styled from 'styled-components'
import { Drawer } from 'antd'
import { isMobile } from 'react-device-detect'

import { colors } from '../../styles'
import back from '../../assets/images/back1.jpg'

const Container = styled.div`
  height: 100%;
`

const Background = styled.div`
  position: absolute;
  height: ${isMobile ? 'calc(100rem - 200px)' : '100%'};
  /* height: 100%; */
  width: 100%;
  z-index: -99;
  background: url(${back}) center center no-repeat;
  background-size: cover;
  background-repeat: repeat-y;
  z-index: 1;
  &:before {
    z-index: -99;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to bottom, #000, ${colors.wetAsphalt});
    opacity: 0.7;
  }
`

const Wrapper = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  flex: 1;
  flex-direction: column;
  /* height: 100%; */
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
    margin: 0;
    color: ${colors.clouds};
  }

  & div {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    margin: 5px 0 0 0;

    & h2,
    & h3 {
      margin: 0 0 0 40px;
      color: ${colors.clouds};
    }

    #signup,
    #login {
      padding: 10px;
      border: 1px solid ${colors.clouds};
      transition: 0.25s;

      &:hover {
        background-color: ${colors.lighterTransparent};
      }
    }
  }
`

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  z-index: 200;
  height: 200px;

  & * {
    color: ${colors.clouds};
  }

  & h3 {
    margin: -10px 0 0 0;
  }
`

const Announcement = styled.div`
  display: flex;
  flex-direction: ${!isMobile ? 'row' : 'column'};
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  z-index: 200;
  position: ${isMobile ? 'relative' : 'absolute'};
  bottom: 0;

  & * {
    color: ${colors.clouds};
  }

  & > div {
    margin: ${!isMobile ? '0 20px' : '1px 0'};
  }

  #networks a {
    margin: 0 5px;
  }
`

const Widgets = styled.div`
  height: 100%;
  z-index: 100;
  display: flex;
  padding: 20px;
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
  position: relative;
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
    transform: ${(props) => !props.soon && 'scale(1.035)'};
    cursor: ${(props) => !props.soon && 'pointer'};
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
    width: 100%;
    color: ${colors.clouds};
    background-color: ${colors.alizarin};
  }
`

const StyledDrawer = styled(Drawer)`
  & * {
    color: ${colors.clouds};
  }
  .ant-drawer-body,
  .ant-drawer-header {
    background-color: ${colors.darkerTransparent};
  }

  .ant-drawer-close {
    margin: 12px 0 0 0;
  }
`

export { Container, Background, Wrapper, Top, Middle, Announcement, Widgets, WidgetRow, Widget, StyledDrawer }
